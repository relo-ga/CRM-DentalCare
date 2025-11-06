import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class createTratamientoDto {
  @IsNotEmpty()
  clinica_id: string;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsOptional()
  @IsNumber()
  duracion_estimada?: number;
}
