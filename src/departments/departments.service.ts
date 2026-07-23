import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    try {
      return await this.prisma.department.create({
        data: {
          code: dto.code,
          name: dto.name,
          ownerName: dto.ownerName || null,
          isActive: dto.isActive ?? true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Department code already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.department.findMany({
      orderBy: { code: 'asc' },
    });
  }

  async findAllWithReadings() {
    return this.prisma.department.findMany({
      include: {
        waterReadings: {
          orderBy: { readingDate: 'asc' },
        },
      },
      orderBy: { code: 'asc' },
    });
  }

  async findOne(id: string) {
    const dept = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!dept) {
      throw new NotFoundException('Department not found');
    }
    return dept;
  }

  async update(id: string, dto: UpdateDepartmentDto) {
    const dept = await this.findOne(id);
    return this.prisma.department.update({
      where: { id },
      data: {
        name: dto.name ?? dept.name,
        ownerName: dto.ownerName ?? dept.ownerName,
        isActive: dto.isActive ?? dept.isActive,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.department.delete({
      where: { id },
    });
  }
}
