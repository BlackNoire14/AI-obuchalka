import React, { useEffect, useMemo, useState } from 'react';
import './practice.css';
import { tasks, PracticeTask } from '../data/tasks';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { useSearchParams } from 'react-router-dom';

const LS_CODE_PREFIX = 'codetutor.code.'; // + taskId
const LS_PROGRESS_KEY = 'codetutor.progress';

function transpileTsToJs(tsSource: string): string {
  // Упрощённый транспайлер: удаляет аннотации типов и generics
  return tsSource
    .replace(/: \s*[A-Za-z_][A-Za-z0-9_<>\[\],\s]*/g, '')
    .replace(/<[^>]+>/g, '')
    // Удаляем строки вида: export { sum };
    .replace(/^\s*export\s+\{[^}]*\};?\s*$/gm, '')
    // Удаляем ключевое слово export перед объявлениями
    .replace(/^\s*export\s+(function|const|let|var|class)\s+/gm, '$1 ');
}

function deepEqual(a: any, b: any): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    const ak = Object.keys(a), bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    for (const k of ak) if (!deepEqual(a[k], b[k])) return false;
    return true;
  }
  return a === b;
}

function getExportedFunction(sourceJs: string, exportName: string): any {
  const wrapped = `${sourceJs}\n;return (typeof ${exportName}!=="undefined"?{fn:${exportName}}:{});`;
  const factory = new Function(wrapped);
  return factory();
}

const Practice: React.FC = () => {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const [currentTaskId, setCurrentTaskId] = useState<string>(tasks[0].id);
  const currentTask: PracticeTask = useMemo(
    () => tasks.find(t => t.id === currentTaskId) || tasks[0],
    [currentTaskId]
  );

  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [checking, setChecking] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<string, number>>({}); // taskId -> passed count
  const [hint, setHint] = useState<string>('');
  const [hintLoading, setHintLoading] = useState<boolean>(false);

  // Инициализация кода и прогресса из localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LS_CODE_PREFIX + currentTask.id);
    setCode(saved ?? currentTask.starterCode);
  }, [currentTask.id, currentTask.starterCode]);

  // Обработка query-параметра ?task=<id>
  useEffect(() => {
    const q = searchParams.get('task');
    if (!q) return;
    const found = tasks.find(t => t.id === q);
    if (found) setCurrentTaskId(found.id);
  }, [searchParams]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_PROGRESS_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
  }, []);

  // Если пользователь авторизован — подтянуть прогресс с сервера
  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const { data } = await api.get('/api/progress');
        if (data?.data && typeof data.data === 'object') {
          setProgress(data.data);
          localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(data.data));
        }
      } catch {}
    };
    load();
  }, [token]);

  // Автосохранение кода
  useEffect(() => {
    localStorage.setItem(LS_CODE_PREFIX + currentTask.id, code);
  }, [code, currentTask.id]);

  const instructions = useMemo(() => (
    <div className="task">
      <div style={{display:'flex',justifyContent:'space-between',gap:'1rem',alignItems:'center'}}>
        <h2>{currentTask.title}</h2>
        <select
          value={currentTaskId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentTaskId(e.target.value)}
          aria-label="Выбор задачи"
        >
          {tasks.map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>
      <p>{currentTask.description}</p>
      <p><b>Экспорт функции:</b> <code>export {'{ ' + currentTask.exportName + ' }'}</code></p>
      <p>
        Прогресс: {progress[currentTask.id] ?? 0}/{currentTask.tests.length}
      </p>
    </div>
  ), [currentTask, currentTaskId, progress]);

  const run = () => {
    try {
      const js = transpileTsToJs(code);
      const mod = getExportedFunction(js, currentTask.exportName);
      if (!mod.fn) {
        setOutput(`Не найден экспорт ${currentTask.exportName}. Добавьте: export { ${currentTask.exportName} };`);
        return;
      }
      const demoArgs = currentTask.tests[0]?.args ?? [];
      const result = (mod.fn as Function)(...demoArgs);
      setOutput(`Демонстрационный запуск: ${currentTask.exportName}(${JSON.stringify(demoArgs).slice(1,-1)}) => ${JSON.stringify(result)}`);
    } catch (e: any) {
      setOutput('Ошибка выполнения: ' + (e?.message || String(e)));
    }
  };

  const check = async () => {
    setChecking(true);
    try {
      const js = transpileTsToJs(code);
      const mod = getExportedFunction(js, currentTask.exportName);
      if (!mod.fn) {
        setOutput(`Не найден экспорт ${currentTask.exportName}. Добавьте: export { ${currentTask.exportName} };`);
        return;
      }
      const f = mod.fn as Function;
      const results = currentTask.tests.map(tc => {
        try {
          const got = f(...tc.args);
          const ok = deepEqual(got, tc.expected);
          return { name: tc.name, passed: ok, got };
        } catch (e: any) {
          return { name: tc.name, passed: false, got: e?.message || String(e) };
        }
      });
      const passed = results.filter(r => r.passed).length;
      const report = [
        `Пройдено тестов: ${passed}/${currentTask.tests.length}`,
        ...results.map(r => `${r.passed ? '✅' : '❌'} ${r.name}${r.passed ? '' : ` (получено: ${JSON.stringify(r.got)})`}`)
      ].join('\n');
      setOutput(report);

      const newProgress = { ...progress, [currentTask.id]: passed };
      setProgress(newProgress);
      localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(newProgress));

      // Если авторизован — сохранить прогресс на сервере
      if (token) {
        try {
          await api.post('/api/progress', { data: newProgress });
        } catch {}
      }
    } catch (e: any) {
      setOutput('Ошибка проверки: ' + (e?.message || String(e)));
    } finally {
      setChecking(false);
    }
  };

  const getHint = async () => {
    setHint('');
    setHintLoading(true);
    try {
      const { data } = await api.post('/api/ai/hint', {
        taskId: currentTask.id,
        description: currentTask.description,
        code,
      });
      setHint(data?.hint || 'Подсказка недоступна.');
    } catch (e: any) {
      const err = e?.response?.data;
      let msg = (err?.error as string) || 'Ошибка получения подсказки';
      if (err?.details) msg += `: ${err.details}`;
      const status = e?.response?.status;
      if (status === 500 && typeof msg === 'string' && msg.includes('OPENAI_API_KEY')) {
        setHint('На сервере не настроен OPENAI_API_KEY. Укажите ключ в backend/.env и перезапустите backend.');
      } else {
        setHint(msg);
      }
    } finally {
      setHintLoading(false);
    }
  };

  const reset = () => {
    setCode(currentTask.starterCode);
    setOutput('');
  };

  return (
    <div className="practice">
      {instructions}
      <div className="workspace">
        <div className="editor-panel">
          <div className="toolbar">
            <button className="btn" onClick={run}>Запустить</button>
            <button className="btn primary" onClick={check} disabled={checking}>
              {checking ? 'Проверка…' : 'Проверить'}
            </button>
            <button className="btn" onClick={getHint} disabled={hintLoading}>
              {hintLoading ? 'Подсказка…' : 'Подсказка ИИ'}
            </button>
            <button className="btn ghost" onClick={reset}>Сбросить</button>
          </div>
          <textarea
            className="editor"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="output-panel">
          <h3>Вывод</h3>
          <pre className="output">{output || 'Запустите код или проверьте решение, чтобы увидеть вывод.'}</pre>
          {hint ? (
            <>
              <h3 style={{ marginTop: '1rem' }}>Подсказка ИИ</h3>
              <pre className="output">{hint}</pre>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Practice;
