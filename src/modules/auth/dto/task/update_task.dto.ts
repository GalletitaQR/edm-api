// UpdateTaskDto
import { IsString, IsBoolean, IsOptional, MinLength, MaxLength } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsString({ message: 'Debe ser una cadena' })
    @MinLength(3, { message: 'Debe tener al menos 3 caracteres' })
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @IsString({ message: 'Debe ser una cadena' })
    @MinLength(3, { message: 'Debe tener al menos 3 caracteres' })
    @MaxLength(250)
    description?: string;  

    @IsOptional()
    @IsBoolean()
    priority?: boolean;

    @IsOptional()
    userId?: number;
}