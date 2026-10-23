import{IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max} from "class-validator";
import{Type} from "class-transformer";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    instructor: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(5)
    credits: number;

    @IsString()
    @IsOptional()
    description?: string;
}
