import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';

@Injectable()
export class ReceiptsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReceiptDto) {
    return this.prisma.receipt.create({
      data: {
        totalCharge: dto.totalCharge,
        periodStart: new Date(dto.periodStart),
        periodEnd: new Date(dto.periodEnd),
        pricePerM3: dto.pricePerM3,
        paymentDeadline: new Date(dto.paymentDeadline),
        pdfUrl: dto.pdfUrl || null,
      },
    });
  }

  async findAll() {
    return this.prisma.receipt.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.receipt.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: CreateReceiptDto) {
    return this.prisma.receipt.update({
      where: { id },
      data: {
        totalCharge: dto.totalCharge,
        periodStart: new Date(dto.periodStart),
        periodEnd: new Date(dto.periodEnd),
        pricePerM3: dto.pricePerM3,
        paymentDeadline: new Date(dto.paymentDeadline),
        pdfUrl: dto.pdfUrl || null,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.receipt.delete({
      where: { id },
    });
  }
}
