import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importando PrismaModule

@Module({
  imports: [PrismaModule], // Adicionando PrismaModule
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
