import { IsOptional, IsString, IsNumber, IsBoolean, IsNotEmpty, IsPositive, Min } from 'class-validator';

export class CreateFacultyDto {
  
  @IsString()
  @IsNotEmpty()
  Id: string;

  @IsString()
  @IsNotEmpty()
  Name: string;
  
  @IsString()
  @IsNotEmpty()
  expertise: string;

 @IsNumber()
 @IsPositive()
 @IsOptional()
 noOfPublication?: number;
}