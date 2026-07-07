import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WaterReadingsService } from './water-readings.service';
import { CreateWaterReadingDto } from './dto/create-water-reading.dto';
import { UpdateWaterReadingDto } from './dto/update-water-reading.dto';

@Controller('departments/:departmentId/water-readings')
@UseGuards(JwtAuthGuard)
export class WaterReadingsController {
  constructor(private waterReadingsService: WaterReadingsService) {}

  @Post()
  create(
    @Param('departmentId') departmentId: string,
    @Body() dto: CreateWaterReadingDto,
  ) {
    return this.waterReadingsService.create(departmentId, dto);
  }

  @Get()
  findByDepartment(@Param('departmentId') departmentId: string) {
    return this.waterReadingsService.findByDepartment(departmentId);
  }
}

@Controller('water-readings')
@UseGuards(JwtAuthGuard)
export class WaterReadingsDetailController {
  constructor(private waterReadingsService: WaterReadingsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waterReadingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWaterReadingDto,
  ) {
    return this.waterReadingsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waterReadingsService.remove(id);
  }
}
