import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CitaService } from './cita.service';
import { createCitaDto } from './dto/create-cita.dto';
import { updateCitaDto } from './dto/update-cita.dto';

@Controller('cita')
export class CitaController {
  constructor(private citasService: CitaService) {}

  @Get('all')
  findAll() {
    return this.citasService.findAll();
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.citasService.findId(id);
  }

  @Post()
  createCita(@Body() data: createCitaDto) {
    return this.citasService.createCita(data);
  }

  @Patch(':id')
  updateCita(@Param('id') id: string, @Body() data: updateCitaDto) {
    return this.citasService.updateCita(id, data);
  }

  @Delete(':id')
  deleteCita(@Param('id') id: string) {
    return this.citasService.deleCita(id);
  }

  @Get('citadoctor/:id')
  citaDoctor(@Param('id') id: string) {
    return this.citasService.citaDoctor(id);
  }
}
