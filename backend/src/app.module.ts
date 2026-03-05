import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ObrasModule } from './obras/obras.module';
import { TareasModule } from './tareas/tareas.module';
import { ReportesModule } from './reportes/reportes.module';
import { PagosModule } from './pagos/pagos.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [PrismaModule, UsersModule, ObrasModule, TareasModule, ReportesModule, PagosModule, WhatsappModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
