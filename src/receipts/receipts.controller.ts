import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, HttpCode, NotFoundException } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('receipts')
@UseGuards(JwtAuthGuard)
export class ReceiptsController {
  constructor(private receiptsService: ReceiptsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateReceiptDto) {
    return this.receiptsService.create(dto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.receiptsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const receipt = await this.receiptsService.findById(id);
    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }
    return receipt;
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() dto: CreateReceiptDto) {
    return this.receiptsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.receiptsService.delete(id);
  }
}
