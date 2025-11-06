import {
  Controller,
  Get,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { updateUsuariosDto } from './dto/update-usuarios.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateUsuario(@Param('id') id: string, @Body() data: updateUsuariosDto) {
    return this.usuariosService.updateUsuario(id, data);
  }

  @Delete(':id')
  async deleteUsuario(@Param('id') id: string) {
    return this.usuariosService.deleteUsuario(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'DOCTOR')
  @Get('citas/:id')
  async getCitasUsuario(@Param('id') id: string) {
    return this.usuariosService.getCitasUsuario(id);
  }
}
