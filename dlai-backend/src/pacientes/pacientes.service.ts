import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPacienteDto } from './dto/create-pacientes.dto';
import { updatePacientesDto } from './dto/update-pacientes.dto';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.paciente.findMany();
  }

  findId(id: string) {
    return this.prisma.paciente.findUnique({ where: { id } });
  }

  async createPaciente(data: createPacienteDto) {
    return this.prisma.paciente.create({ data });
  }

  async updatePaciente(id: string, data: updatePacientesDto) {
    await this.findId(id);
    return this.prisma.paciente.update({ where: { id }, data });
  }

  async deletePaciente(id: string) {
    await this.findId(id);
    return this.prisma.paciente.delete({ where: { id } });
  }

  async getPacienteCita(id: string) {
    await this.findId(id);
    return this.prisma.paciente.findUnique({
      where: { id },
      include: {
        citas: true,
      },
    });
  }
}
