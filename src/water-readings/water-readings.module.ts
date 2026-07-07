import { Module } from '@nestjs/common';
import { WaterReadingsService } from './water-readings.service';
import { WaterReadingsController, WaterReadingsDetailController } from './water-readings.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WaterReadingsController, WaterReadingsDetailController],
  providers: [WaterReadingsService, PrismaService],
})
export class WaterReadingsModule {}
