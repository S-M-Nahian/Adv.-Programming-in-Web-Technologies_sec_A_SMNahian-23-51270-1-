import { IsOptional, IsString, IsNumber, IsBoolean, IsNotEmpty, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(()=> Number)
  stock?: number;

  @IsString()
  @IsNotEmpty()
  category: string;
  
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}