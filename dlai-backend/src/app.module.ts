import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClinicasController } from './clinicas/clinicas.controller';
import { ClinicasService } from './clinicas/clinicas.service';
import { ClinicasModule } from './clinicas/clinicas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrismaModule } from './prisma/prisma.module';
import { PacientesService } from './pacientes/pacientes.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { TratamientosService } from './tratamientos/tratamientos.service';
import { TratamientosModule } from './tratamientos/tratamientos.module';
import { CitaService } from './cita/cita.service';
import { CitaController } from './cita/cita.controller';
import { CitaModule } from './cita/cita.module';
import { MensajeService } from './mensaje/mensaje.service';
import { MensajeController } from './mensaje/mensaje.controller';
import { MensajeModule } from './mensaje/mensaje.module';
import { PacientesController } from './pacientes/pacientes.controller';

@Module({
  imports: [
    AuthModule,
    ClinicasModule,
    UsuariosModule,
    PrismaModule,
    PacientesModule,
    TratamientosModule,
    CitaModule,
    MensajeModule,
  ],
  controllers: [
    AppController,
    ClinicasController,
    CitaController,
    MensajeController,
    PacientesController,
  ],
  providers: [
    AppService,
    ClinicasService,
    PacientesService,
    TratamientosService,
    CitaService,
    MensajeService,
  ],
})
export class AppModule {}
