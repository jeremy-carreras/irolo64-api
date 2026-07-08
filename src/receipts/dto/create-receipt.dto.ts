import { IsNumber, IsDateString } from 'class-validator';

export class CreateReceiptDto {
  @IsNumber()
  totalCharge: number;

  @IsDateString()
  periodStart: string;

  @IsDateString()
  periodEnd: string;

  @IsNumber()
  pricePerM3: number;

  @IsDateString()
  paymentDeadline: string;
}
