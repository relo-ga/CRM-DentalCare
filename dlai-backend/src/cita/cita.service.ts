import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCitaDto } from './dto/create-cita.dto';
import { updateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitaService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cita.findMany();
  }

  findId(id: string) {
    return this.prisma.cita.findUnique({ where: { id } });
  }

  createCita(data: createCitaDto) {
    return this.prisma.cita.create({ data });
  }

  async updateCita(id: string, data: updateCitaDto) {
    await this.findId(id);
    return this.prisma.cita.update({ where: { id }, data });
  }

  async deleCita(id: string) {
    await this.findId(id);
    return this.prisma.cita.delete({ where: { id } });
  }

  async citaDoctor(doctor_id: string) {
    return this.prisma.cita.findMany({
      where: { doctor_id },
      include: {
        paciente: true,
      },
      orderBy: {
        fecha: 'asc',
      },
    });
  }
}
