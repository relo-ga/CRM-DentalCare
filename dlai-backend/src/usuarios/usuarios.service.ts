import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateusuarioDto } from './dto/create-usuarios.dto';
import { updateUsuariosDto } from './dto/update-usuarios.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async findEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.usuario.findUnique({ where: { id } });
      if (!user) throw new NotFoundException('Usuario no encontrado');
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('Error Desconocido');
      }
    }
  }

  async create(data: CreateusuarioDto) {
    return this.prisma.usuario.create({ data });
  }

  async updateUsuario(id: string, data: updateUsuariosDto) {
    let hashed: string | undefined = undefined;
    await this.findOne(id);
    if (data.password) hashed = await bcrypt.hash(data.password, 10);

    return this.prisma.usuario.update({
      where: { id },
      data: {
        ...data,
        clinica_id: data.clinica_id || null,
        ...(hashed && { password: hashed }),
      },
    });
  }

  async deleteUsuario(id: string) {
    await this.findOne(id);
    return this.prisma.usuario.delete({
      where: { id },
    });
  }

  async getCitasUsuario(id: string) {
    await this.findOne(id);
    return this.prisma.usuario.findUnique({
      where: { id },
      include: {
        clinica: {
          include: {
            citas: true,
          },
        },
      },
    });
  }
}
