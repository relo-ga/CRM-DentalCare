import { createTratamientoDto } from './create-tratamiento.dto';
import { PartialType } from '@nestjs/mapped-types';

export class updateTratamientoDto extends PartialType(createTratamientoDto) {}
