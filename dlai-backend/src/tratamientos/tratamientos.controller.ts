import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { createTratamientoDto } from './dto/create-tratamiento.dto';
import { updateTratamientoDto } from './dto/update-tratamiento.dto';

@Controller('tratamientos')
export class TratamientosController {
  constructor(private tratamientosService: TratamientosService) {}

  @Get('all')
  findAll() {
    return this.tratamientosService.findAll();
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.tratamientosService.findId(id);
  }

  @Post()
  createTratamiento(@Body() data: createTratamientoDto) {
    return this.tratamientosService.createTratamiento(data);
  }

  @Patch(':id')
  updateTratamiento(
    @Param('id') id: string,
    @Body() data: updateTratamientoDto,
  ) {
    return this.tratamientosService.updateTratamiento(id, data);
  }

  @Delete(':id')
  deleteTratamiento(@Param('id') id: string) {
    return this.tratamientosService.deleteTratamiento(id);
  }
}
