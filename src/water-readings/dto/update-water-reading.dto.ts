import { IsDateString, IsDecimal, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateWaterReadingDto {
  @IsDateString()
  @IsOptional()
  readingDate?: string;

  @IsDecimal({ decimal_digits: '1,2' })
  @IsOptional()
  @Type(() => String)
  meterReading?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
