import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
// Polyfill fetch для Node < 18
import { fetch as undiciFetch } from 'undici';
if (!(globalThis as any).fetch) {
  (globalThis as any).fetch = undiciFetch as any;
}

dotenv.config();

const router = Router();

// POST /api/ai/hint
// body: { taskId: string, description?: string, code?: string }
router.post('/hint', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY || '';
    if (!apiKey) {
      return res.status(500).json({ error: 'OPENAI_API_KEY не настроен на сервере' });
    }

    const { taskId, description, code } = req.body || {};
    if (!taskId) return res.status(400).json({ error: 'taskId обязателен' });

    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const client = new OpenAI({
      apiKey,
      organization: process.env.OPENAI_ORG || undefined,
      project: process.env.OPENAI_PROJECT || undefined,
    });

    const system = 'Ты — помощник по программированию. Дай короткую, наводящую подсказку (не готовое решение). Если есть ошибка, укажи направление, но не раскрывай полный код.';
    const user = [
      description ? `Задача: ${description}` : undefined,
      code ? `Текущий код:
${code}` : undefined,
      `Важно: не раскрывай полный финальный код. Дай 1-3 наводки.`,
    ].filter(Boolean).join('\n\n');

    const createCompletion = () => client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: 0.4,
      max_tokens: 250,
    });

    let resp = await createCompletion();
    let hint = resp.choices?.[0]?.message?.content?.trim();

    // Если пусто или пришёл 429 rate limit (не квота) — одно повторение через небольшую паузу
    if (!hint) {
      try {
        await new Promise(r => setTimeout(r, 600));
        resp = await createCompletion();
        hint = resp.choices?.[0]?.message?.content?.trim();
      } catch {}
    }

    hint = hint || 'Подсказка недоступна.';
    return res.json({ hint, model });
  } catch (e: any) {
    // Попробуем извлечь полезные детали из ответа OpenAI
    const status = e?.status || e?.response?.status || 500;
    const errData = e?.response?.data || e?.data;
    const errMsg = e?.message || errData?.error?.message || 'Неизвестная ошибка';
    console.error('AI hint error:', { status, message: errMsg, data: errData });

    // Фолбэк при ограничении квоты: сгенерировать локальную краткую подсказку
    if (status === 429) {
      try {
        const { description, code } = req.body || {};
        const tips: string[] = [];
        if (typeof description === 'string' && description.length > 0) {
          tips.push(`Кратко переформулируй задачу: ${description.slice(0, 160)}...`);
        }
        if (typeof code === 'string') {
          if (/return\s+0\s*;/.test(code)) tips.push('Проверьте, что функция возвращает вычисленное значение, а не заглушку 0.');
          if (/export\s+\{\s*\w+\s*\}\s*;/.test(code)) tips.push('Экспорт функции указан, убедитесь, что имя экспорта совпадает с требуемым (export { name }).');
          if (/reverse|split\(\)\.reverse\(\)\.join\(\)/.test(code)) tips.push('Для разворота строки можно использовать split("").reverse().join("").');
          if (/factorial|n\s*!/.test(code)) tips.push('Факториал: база n=0 ⇒ 1; рекурсивно n * factorial(n-1) или цикл.');
          if (/maxInArray|Math\.max/.test(code)) tips.push('Максимум массива: Math.max(...arr) или однопроходным сравнением.');
          if (/binarySearch|mid/.test(code)) tips.push('Бинарный поиск: поддерживайте left/right, вычисляйте mid, сдвиг границ по сравнению с target.');
        }
        if (tips.length === 0) tips.push('Разбейте задачу на шаги, проверьте граничные случаи и выведите промежуточные значения для отладки.');
        const hint = `Локальная подсказка (без OpenAI):\n- ${tips.join('\n- ')}`;
        return res.json({ hint, model: 'local-fallback' });
      } catch {}
    }
    return res.status(status).json({ error: 'Ошибка генерации подсказки', details: errMsg });
  }
});

export default router;
