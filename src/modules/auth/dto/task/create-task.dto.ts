/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString({ message: 'Nombre debe ser una cadena' })
  @MinLength(3, { message: 'Nombre debe tener al menos 3 caracteres' })
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsString({ message: 'Descripción debe ser una cadena' })
  @MinLength(3, { message: 'Descripción debe tener al menos 3 caracteres' })
  @MaxLength(500)
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  priority: boolean;

  userId: number;
}
