/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Definir porta do servidor
  const port = process.env.PORT ?? 3009;

  // Inicializar Prisma e testar conexão com o banco
  const prismaService = app.get(PrismaService);
  await prismaService.$connect();
  console.log('✅ Conectado ao banco de dados PostgreSQL!');

  await app.listen(port);
  // eslint-disable-next-line prettier/prettier
  console.log(`🚀 Servidor rodando na porta ${port}. Acesse: http://localhost:${port}`);
}

void bootstrap();
