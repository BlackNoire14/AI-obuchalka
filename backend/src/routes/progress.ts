import { Router, Response } from 'express';
import { auth, AuthRequest } from '../middleware/auth';
import { Progress } from '../models/Progress';

const router = Router();

// GET /api/progress - получить прогресс текущего пользователя
router.get('/', auth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    let prog = await Progress.findOne({ user: userId });
    if (!prog) {
      prog = await Progress.create({ user: userId, data: {} });
    }
    return res.json({ data: prog.data });
  } catch (e: any) {
    return res.status(500).json({ error: 'Ошибка получения прогресса', details: e?.message });
  }
});

// POST /api/progress - сохранить/обновить прогресс текущего пользователя
// body: { data: Record<string, number> }
router.post('/', auth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { data } = req.body || {};
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Некорректные данные прогресса' });
    }

    const prog = await Progress.findOneAndUpdate(
      { user: userId },
      { $set: { data } },
      { new: true, upsert: true }
    );

    return res.json({ data: prog.data });
  } catch (e: any) {
    return res.status(500).json({ error: 'Ошибка сохранения прогресса', details: e?.message });
  }
});

export default router;
