import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  NotFoundException,
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
  @HttpCode(201)
  create(
    @Param('departmentId') departmentId: string,
    @Body() dto: CreateWaterReadingDto,
  ) {
    return this.waterReadingsService.create(departmentId, dto);
  }

  @Get()
  @HttpCode(200)
  findByDepartment(@Param('departmentId') departmentId: string) {
    return this.waterReadingsService.findByDepartment(departmentId);
  }
}

@Controller('water-readings')
@UseGuards(JwtAuthGuard)
export class WaterReadingsDetailController {
  constructor(private waterReadingsService: WaterReadingsService) {}

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const reading = await this.waterReadingsService.findOne(id);
    if (!reading) {
      throw new NotFoundException('Water reading not found');
    }
    return reading;
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWaterReadingDto,
  ) {
    return this.waterReadingsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.waterReadingsService.remove(id);
  }
}
