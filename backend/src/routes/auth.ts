import { Router, Request, Response } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { User } from '../models/User';

const router = Router();

function signToken(id: string) {
  const secret = process.env.JWT_SECRET as Secret;
  const expiresIn = (process.env.JWT_EXPIRES_IN || '30d') as SignOptions['expiresIn'];
  return jwt.sign({ id }, secret, { expiresIn });
}

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email и password обязательны' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Пользователь уже существует' });

    const user = await User.create({ email, password, name });
    const token = signToken(user._id.toString());
    return res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (e: any) {
    return res.status(500).json({ error: 'Ошибка регистрации', details: e?.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email и password обязательны' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Неверные учетные данные' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: 'Неверные учетные данные' });

    const token = signToken(user._id.toString());
    return res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (e: any) {
    return res.status(500).json({ error: 'Ошибка входа', details: e?.message });
  }
});

export default router;
