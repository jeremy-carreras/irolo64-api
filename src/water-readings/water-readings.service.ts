import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWaterReadingDto } from './dto/create-water-reading.dto';
import { UpdateWaterReadingDto } from './dto/update-water-reading.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class WaterReadingsService {
  constructor(private prisma: PrismaService) {}

  async create(departmentId: string, dto: CreateWaterReadingDto) {
    await this.validateDepartment(departmentId);

    return this.prisma.waterReading.create({
      data: {
        departmentId,
        readingDate: new Date(dto.readingDate),
        meterReading: new Decimal(dto.meterReading),
        notes: dto.notes || null,
      },
    });
  }

  async findByDepartment(departmentId: string) {
    await this.validateDepartment(departmentId);

    const readings = await this.prisma.waterReading.findMany({
      where: { departmentId },
      orderBy: { readingDate: 'asc' },
    });

    // Calculate consumption (difference with previous reading)
    return readings.map((reading, idx) => {
      const consumption =
        idx === 0
          ? new Decimal(0)
          : new Decimal(reading.meterReading).minus(
              new Decimal(readings[idx - 1].meterReading),
            );

      return {
        ...reading,
        consumption: consumption.toNumber(),
      };
    });
  }

  async findAll() {
    return this.prisma.waterReading.findMany({
      include: {
        department: true,
      },
      orderBy: [{ readingDate: 'desc' }, { department: { code: 'asc' } }],
    });
  }

  async findByDate(date: string) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    return this.prisma.waterReading.findMany({
      where: {
        readingDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        department: true,
      },
      orderBy: { department: { code: 'asc' } },
    });
  }

  async findOne(id: string) {
    const reading = await this.prisma.waterReading.findUnique({
      where: { id },
    });
    if (!reading) {
      throw new NotFoundException('Water reading not found');
    }
    return reading;
  }

  async update(id: string, dto: UpdateWaterReadingDto) {
    const reading = await this.findOne(id);
    return this.prisma.waterReading.update({
      where: { id },
      data: {
        readingDate: dto.readingDate
          ? new Date(dto.readingDate)
          : reading.readingDate,
        meterReading: dto.meterReading
          ? new Decimal(dto.meterReading)
          : reading.meterReading,
        notes: dto.notes ?? reading.notes,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.waterReading.delete({
      where: { id },
    });
  }

  private async validateDepartment(departmentId: string) {
    const dept = await this.prisma.department.findUnique({
      where: { id: departmentId },
    });
    if (!dept) {
      throw new NotFoundException('Department not found');
    }
  }
}
