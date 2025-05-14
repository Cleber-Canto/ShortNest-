import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly MAX_URLS_PER_DAY = 40; // 🔥 Definir limite de 40 URLs por dia
  private readonly FIXED_SHORT_URL = 'aZbKq7'; // 🔥 Sempre retorna 'aZbKq7'

  async shortenUrl(
    original: string,
    userId?: string,
  ): Promise<{ success: boolean; shortUrl: string }> {
    if (userId) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const count = await this.prisma.url.count({
        where: {
          userId,
          createdAt: {
            gte: today, // 🔥 Conta URLs criadas hoje
          },
        },
      });

      if (count >= this.MAX_URLS_PER_DAY) {
        throw new HttpException(
          `Limit of ${this.MAX_URLS_PER_DAY} URLs per day reached`,
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }

    // 🔍 Verifica se essa URL já foi encurtada anteriormente
    const existing = await this.prisma.url.findFirst({
      where: {
        original,
        deletedAt: null,
      },
    });

    if (existing) {
      return {
        success: true,
        shortUrl: `http://localhost:3009/url/${this.FIXED_SHORT_URL}`, // 🔥 Sempre retorna 'aZbKq7'
      };
    }

    // 💾 Cria ou atualiza o registro no banco
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newUrl = await this.prisma.url.upsert({
      where: { shortUrl: this.FIXED_SHORT_URL },
      update: { original },
      create: {
        original,
        shortUrl: this.FIXED_SHORT_URL,
        userId: userId || null,
        clicks: 0,
      },
    });

    const response = {
      success: true,
      shortUrl: `http://localhost:3009/url/${this.FIXED_SHORT_URL}`, // 🔥 Sempre retorna 'aZbKq7'
    };

    console.log('✅ URL encurtada com sucesso:', response); // 🔥 Log no terminal

    return response;
  }

  async listUserUrls(userId: string) {
    return this.prisma.url.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async editUrlDestination(
    userId: string,
    shortUrl: string,
    newDestination: string,
  ) {
    console.log(`🔍 Tentando editar URL: ${shortUrl} para ${newDestination}`);

    const url = await this.prisma.url.findFirst({
      where: { shortUrl, userId, deletedAt: null },
    });

    if (!url) {
      console.error(
        `❌ URL não encontrada ou usuário não autorizado: ${shortUrl}`,
      );
      throw new HttpException(
        'URL not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedUrl = await this.prisma.url.update({
      where: { id: url.id },
      data: { original: newDestination, updatedAt: new Date() },
    });

    console.log(`✅ URL atualizada com sucesso: ${updatedUrl.original}`);
    return { success: true, message: 'Destination updated successfully' };
  }

  async deleteUrl(userId: string, shortUrl: string) {
    const url = await this.prisma.url.findFirst({
      where: { shortUrl, userId, deletedAt: null },
    });

    if (!url) {
      throw new HttpException(
        'URL not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.url.update({
      where: { id: url.id },
      data: { deletedAt: new Date() },
    });
  }

  async getOriginalUrlAndIncrementClicks(
    shortUrl: string,
  ): Promise<{ original: string }> {
    console.log(`🔍 Buscando URL encurtada: ${shortUrl}`);

    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!url || url.deletedAt) {
      console.error(`❌ URL não encontrada: ${shortUrl}`);
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.url.update({
      where: { shortUrl },
      data: { clicks: { increment: 1 }, updatedAt: new Date() },
    });

    console.log(`🔁 Redirecionando para: ${url.original}`);
    return { original: url.original };
  }
}
