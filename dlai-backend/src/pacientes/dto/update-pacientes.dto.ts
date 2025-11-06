import { PartialType } from '@nestjs/mapped-types';
import { createPacienteDto } from './create-pacientes.dto';

export class updatePacientesDto extends PartialType(createPacienteDto) {}
