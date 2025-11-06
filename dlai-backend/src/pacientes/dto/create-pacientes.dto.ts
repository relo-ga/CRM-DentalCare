import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class createPacienteDto {
  @IsNotEmpty()
  @IsString()
  clinica_id: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha_nacimiento: Date;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsOptional()
  notas?: string;
}
