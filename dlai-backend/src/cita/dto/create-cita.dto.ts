import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';

export class createCitaDto {
  @IsString()
  @IsNotEmpty()
  clinica_id: string;

  @IsString()
  @IsNotEmpty()
  paciente_id: string;

  @IsString()
  @IsNotEmpty()
  tratamiento_id: string;

  @IsString()
  @IsNotEmpty()
  doctor_id: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha: Date;

  @IsNotEmpty()
  @IsEnum($Enums.EstadoCita)
  estado: $Enums.EstadoCita;

  @IsOptional()
  @IsNumber()
  ingreso: number;

  @IsString()
  @IsOptional()
  notas?: string;
}
