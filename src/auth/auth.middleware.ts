import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET is not defined');
      }

      const decoded = jwt.verify(token, secret) as { id: string };
      req['userId'] = decoded.id;
      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ Erro ao verificar token:', error.message); // 🔥 Log de erro no terminal
      } else {
        console.error('❌ Erro ao verificar token:', error); // 🔥 Log de erro no terminal
      }
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
