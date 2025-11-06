import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateusuarioDto } from 'src/usuarios/dto/create-usuarios.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    data: CreateusuarioDto,
  ) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data.email, data.password);
  }
}
