import { IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReceiptDto {
  @IsNumber()
  totalCharge: number;

  @IsNumber()
  consumedM3: number;

  @IsNumber()
  pricePerM3: number;

  @IsDateString()
  periodStart: string;

  @IsDateString()
  periodEnd: string;

  @IsDateString()
  paymentDeadline: string;

  @IsOptional()
  @IsString()
  pdfUrl?: string;
}
