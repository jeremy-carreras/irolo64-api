import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  ownerName?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
