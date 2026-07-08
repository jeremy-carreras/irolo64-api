import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('receipts')
@UseGuards(JwtAuthGuard)
export class ReceiptsController {
  constructor(private receiptsService: ReceiptsService) {}

  @Post()
  create(@Body() dto: CreateReceiptDto) {
    return this.receiptsService.create(dto);
  }

  @Get()
  findAll() {
    return this.receiptsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.receiptsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateReceiptDto) {
    return this.receiptsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.receiptsService.delete(id);
  }
}
