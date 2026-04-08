// UpdateUserDto
import { IsString, MaxLength, MinLength, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'Debe ser una cadena' })
    @MinLength(3, { message: 'Debe tener al menos 3 caracteres' })
    @MaxLength(150)
    name?: string;

    @IsOptional()
    @IsString({ message: 'Debe ser una cadena' })
    @MinLength(3, { message: 'Debe tener al menos 3 caracteres' })
    @MaxLength(150)
    lastname?: string;

    @IsOptional()
    @IsString({ message: 'Debe ser una cadena' })
    @MinLength(3, { message: 'Debe tener al menos 3 caracteres' })
    @MaxLength(150)
    username?: string;
}