import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  ownerName?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
