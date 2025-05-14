/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { Request, Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  // 🔗 Criar nova URL encurtada
  @Post()
  async create(@Req() req: Request, @Body() body: { original: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userId = req['userId'];
    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await this.urlService.shortenUrl(body.original, userId);
    console.log('✅ URL encurtada:', response);
    return response;
  }

  // 📋 Listar URLs do usuário
  @Get('list')
  async list(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userId = req['userId'];
    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await this.urlService.listUserUrls(userId);
    console.log('📋 URLs do usuário:', response);
    return response;
  }

  // ✏️ Atualizar URL original
  @Put()
  async update(
    @Req() req: Request,
    @Body() body: { shortUrl: string; newDestination: string },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userId = req['userId'];
    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const response = await this.urlService.editUrlDestination(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      userId,
      body.shortUrl,
      body.newDestination,
    );

    console.log('✏️ URL atualizada:', response);
    return response;
  }

  // 🗑️ Excluir (lógica) uma URL
  @Delete()
  async delete(@Req() req: Request, @Body() body: { shortUrl: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userId = req['userId'];
    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await this.urlService.deleteUrl(userId, body.shortUrl);
    console.log('🗑️ URL excluída:', response);
    return response;
  }
  // 🔁 Redirecionar para a URL original (SEM AUTENTICAÇÃO)
  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    try {
      console.log(`🔗 Tentando redirecionar: ${shortUrl}`);

      const { original } =
        await this.urlService.getOriginalUrlAndIncrementClicks(shortUrl);

      console.log(`🔁 Redirecionando para: ${original}`);
      return res.redirect(original);
    } catch (error) {
      console.error(`❌ Erro ao redirecionar: ${error.message}`);
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }
  }
}
