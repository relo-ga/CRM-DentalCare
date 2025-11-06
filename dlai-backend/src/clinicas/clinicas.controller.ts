import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClinicasService } from './clinicas.service';

@Controller('clinicas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClinicasController {
  constructor(private clinicasService: ClinicasService) {}

  @Get('all')
  @Roles('SUPERADMIN')
  findAllClinicas() {
    return this.clinicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicasService.findOne(id);
  }

  @Post()
  createClinica(
    @Body()
    data: {
      nombre: string;
      direccion: string;
      telefono: string;
      email: string;
    },
  ) {
    return this.clinicasService.createClinica(data);
  }

  @Patch(':id')
  updateClinica(
    @Param('id') id: string,
    @Body()
    data: {
      nombre: string;
      direccion: string;
      telefono: string;
      email: string;
    },
  ) {
    return this.clinicasService.updateClinica(id, data);
  }

  @Delete()
  deleteClinica(@Param('id') id: string) {
    return this.clinicasService.deleteClinica(id);
  }
}
