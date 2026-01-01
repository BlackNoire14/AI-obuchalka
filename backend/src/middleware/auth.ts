import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Нет токена' });

    const secret = process.env.JWT_SECRET as string;
    if (!secret) return res.status(500).json({ error: 'JWT секрет не настроен' });

    const payload = jwt.verify(token, secret) as { id: string };
    req.userId = payload.id;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Неверный или просроченный токен' });
  }
}
