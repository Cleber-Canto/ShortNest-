import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config(); // 🔥 Carregar variáveis do .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API para encurtamento e gerenciamento de URLs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'Documentação da API',
  });

  // 🔥 Definir porta do servidor
  const port = process.env.PORT ?? 3009;

  // 🔥 Inicializar Prisma e testar conexão com o banco
  const prismaService = app.get(PrismaService);
  await prismaService.$connect();
  console.log('✅ Conectado ao banco de dados PostgreSQL!');

  await app.listen(port);
  console.log(
    `🚀 Servidor rodando na porta ${port}. Acesse: http://localhost:${port}`,
  );
  console.log(
    `📄 Documentação Swagger disponível em: http://localhost:${port}/api-docs`,
  );
}

void bootstrap();
