import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { WaterReadingsModule } from './water-readings/water-readings.module';
import { ReceiptsModule } from './receipts/receipts.module';

@Module({
  imports: [AuthModule, DepartmentsModule, WaterReadingsModule, ReceiptsModule],
})
export class AppModule {}
