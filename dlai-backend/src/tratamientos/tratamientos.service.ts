import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTratamientoDto } from './dto/create-tratamiento.dto';
import { updateTratamientoDto } from './dto/update-tratamiento.dto';

@Injectable()
export class TratamientosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tratamiento.findMany();
  }

  findId(id: string) {
    return this.prisma.tratamiento.findUnique({ where: { id } });
  }

  async createTratamiento(data: createTratamientoDto) {
    return this.prisma.tratamiento.create({ data });
  }

  async updateTratamiento(id: string, data: updateTratamientoDto) {
    await this.findId(id);
    return this.prisma.tratamiento.update({ where: { id }, data });
  }

  async deleteTratamiento(id: string) {
    await this.findId(id);
    return this.prisma.tratamiento.delete({ where: { id } });
  }
}
