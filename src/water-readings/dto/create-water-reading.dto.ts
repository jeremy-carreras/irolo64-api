import { IsDateString, IsDecimal, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWaterReadingDto {
  @IsDateString()
  readingDate: string;

  @IsDecimal({ decimal_digits: '1,2' })
  @Type(() => String)
  meterReading: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
