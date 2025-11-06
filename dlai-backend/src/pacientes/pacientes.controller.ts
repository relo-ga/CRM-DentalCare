import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { createPacienteDto } from './dto/create-pacientes.dto';
import { updatePacientesDto } from './dto/update-pacientes.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Get('all')
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.pacientesService.findId(id);
  }

  @Post()
  createPaciente(
    @Body()
    data: createPacienteDto,
  ) {
    return this.pacientesService.createPaciente(data);
  }

  @Patch(':id')
  updatePaciente(
    @Param('id') id: string,
    @Body()
    data: updatePacientesDto,
  ) {
    return this.pacientesService.updatePaciente(id, data);
  }

  @Delete(':id')
  deletePaciente(@Param('id') id: string) {
    return this.pacientesService.deletePaciente(id);
  }

  @Get('cita/:id')
  async getPacienteCita(@Param('id') id: string) {
    return this.pacientesService.getPacienteCita(id);
  }
}
