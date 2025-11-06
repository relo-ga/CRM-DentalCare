import { PartialType } from '@nestjs/mapped-types';
import { CreateusuarioDto } from './create-usuarios.dto';

export class updateUsuariosDto extends PartialType(CreateusuarioDto) {}
