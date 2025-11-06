import { $Enums } from '@prisma/client';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateusuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsEnum($Enums.Rol)
  rol: $Enums.Rol;

  @IsOptional()
  @IsString()
  clinica_id?: string;
}
