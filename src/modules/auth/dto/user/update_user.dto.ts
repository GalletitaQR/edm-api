// UpdateUserDto
import { IsString, MaxLength, MinLength, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'Debe ser una cadena' })
    @MinLength(3, { message: 'Debe tener al menos 3 caracteres' })
    @MaxLength(20)
    name?: string;

    @IsOptional()
    @IsString({ message: 'Debe ser una cadena' })
    @MinLength(3, { message: 'Debe tener al menos 3 caracteres' })
    @MaxLength(25)
    lastname?: string;

    @IsOptional()
    @IsString({ message: 'Debe ser una cadena' })
    @MinLength(3, { message: 'Debe tener al menos 3 caracteres' })
    @MaxLength(20)
    username?: string;
}