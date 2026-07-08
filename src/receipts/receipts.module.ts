import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ReceiptsService, PrismaService],
  controllers: [ReceiptsController],
})
export class ReceiptsModule {}
