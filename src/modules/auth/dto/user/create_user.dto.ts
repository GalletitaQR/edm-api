import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
      @IsNotEmpty()
      @IsString({ message: 'Nombre debe ser una cadena' })
      @MinLength(3, { message: 'Nombre debe tener al menos 3 caracteres' })
      @MaxLength(20)
      name: string;
    
      @IsString()
      @IsNotEmpty()
      @IsString({ message: 'Apellido debe ser una cadena' })
      @MinLength(3, { message: 'Apellido debe tener al menos 3 caracteres' })
      @MaxLength(25)
      lastname: string;
    
      @IsNotEmpty()
      @IsString({ message: 'Nombre de usuario debe ser una cadena' })
      @MinLength(3, { message: 'Nombre de usuario debe tener al menos 3 caracteres' })
      @MaxLength(20)
      username: string;
    
      @IsNotEmpty()
      @IsString({ message: 'Contraseña debe ser una cadena' })
      @MinLength(8, { message: 'Contraseña debe tener al menos 8 caracteres' })
      @MaxLength(25)
      password: string;
}