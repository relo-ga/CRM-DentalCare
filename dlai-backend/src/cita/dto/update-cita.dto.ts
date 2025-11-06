import { PartialType } from '@nestjs/mapped-types';
import { createTratamientoDto } from 'src/tratamientos/dto/create-tratamiento.dto';

export class updateCitaDto extends PartialType(createTratamientoDto) {}
