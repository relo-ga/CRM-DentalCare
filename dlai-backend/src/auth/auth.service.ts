import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateusuarioDto } from 'src/usuarios/dto/create-usuarios.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateusuarioDto) {
    const existing = await this.usuariosService.findEmail(data.email);
    if (existing) throw new UnauthorizedException('Email ya registrado');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.usuariosService.create({
      ...data,
      password: hashed,
    });

    return { message: 'Usuario creado', user };
  }

  async login(email: string, password: string) {
    const user = await this.usuariosService.findEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email, rol: user.rol };
    const token = this.jwtService.sign(payload);

    return { access_token: token, user };
  }

  async validateUser(id: string) {
    return this.usuariosService.findOne(id);
  }
}
