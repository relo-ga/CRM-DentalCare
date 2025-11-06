import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClinicasService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.clinica.findMany();
  }

  findOne(id: string) {
    return this.prisma.clinica.findUnique({ where: { id } });
  }

  async createClinica(data: {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
  }) {
    return this.prisma.clinica.create({ data });
  }

  async updateClinica(
    id: string,
    data: {
      nombre: string;
      direccion: string;
      telefono: string;
      email: string;
    },
  ) {
    await this.findOne(id);
    return this.prisma.clinica.update({ where: { id }, data });
  }

  async deleteClinica(id: string) {
    await this.findOne(id);
    return this.prisma.clinica.delete({ where: { id } });
  }
}
