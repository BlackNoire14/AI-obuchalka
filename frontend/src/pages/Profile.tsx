import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { tasks } from '../data/tasks';
import { lessons } from '../data/lessons';
import { Link } from 'react-router-dom';

const LS_PROGRESS_KEY = 'codetutor.progress';

type ProgressMap = Record<string, number>;

const Profile: React.FC = () => {
  const { user, token } = useAuth();
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Загрузка прогресса: если авторизован — с сервера, иначе — из localStorage
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        if (token) {
          const { data } = await api.get('/api/progress');
          if (data?.data && typeof data.data === 'object') {
            setProgress(data.data);
            localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(data.data));
          } else {
            setProgress({});
          }
        } else {
          const raw = localStorage.getItem(LS_PROGRESS_KEY);
          setProgress(raw ? JSON.parse(raw) : {});
        }
      } catch (e: any) {
        setError(e?.response?.data?.error || 'Не удалось получить прогресс');
        // fallback на локальное
        try {
          const raw = localStorage.getItem(LS_PROGRESS_KEY);
          setProgress(raw ? JSON.parse(raw) : {});
        } catch {}
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  // Метрики по задачам
  const taskStats = useMemo(() => {
    const totalTests = tasks.reduce((acc, t) => acc + t.tests.length, 0);
    const passed = tasks.reduce((acc, t) => acc + (progress[t.id] || 0), 0);
    return { passed, totalTests, percent: totalTests ? Math.round((passed / totalTests) * 100) : 0 };
  }, [progress]);

  // Метрики по урокам (ключи вида lesson:<id> -> 0/1)
  const lessonStats = useMemo(() => {
    const ids = lessons.map(l => `lesson:${l.id}`);
    const total = ids.length;
    const done = ids.reduce((acc, id) => acc + (progress[id] ? 1 : 0), 0);
    return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  }, [progress]);

  return (
    <div className="page">
      <h1>Профиль</h1>

      <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Учетная запись</h3>
        {user ? (
          <ul>
            <li><b>Email:</b> {user.email}</li>
            {user.name ? <li><b>Имя:</b> {user.name}</li> : null}
            <li><b>Статус:</b> Авторизован</li>
          </ul>
        ) : (
          <>
            <p>Вы не авторизованы. Прогресс отображается из локального хранилища браузера.</p>
            <Link className="btn" to="/login">Войти</Link>
          </>
        )}
      </section>

      <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Сводка прогресса</h3>
        {loading ? (
          <p>Загрузка…</p>
        ) : (
          <>
            {error && <div style={{ color: 'crimson', marginBottom: '0.5rem' }}>{error}</div>}
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div>
                <b>Задачи:</b> {taskStats.passed}/{taskStats.totalTests} тестов (≈{taskStats.percent}%)
              </div>
              <div>
                <b>Уроки:</b> {lessonStats.done}/{lessonStats.total} завершено (≈{lessonStats.percent}%)
              </div>
            </div>
          </>
        )}
      </section>

      <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Детали по задачам</h3>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {tasks.map(t => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{t.title}</div>
                <div style={{ color: '#666' }}>Пройдено тестов: {progress[t.id] || 0}/{t.tests.length}</div>
              </div>
              <Link className="btn" to={`/practice?task=${encodeURIComponent(t.id)}`}>Открыть</Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Детали по урокам</h3>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {lessons.map(l => {
            const key = `lesson:${l.id}`;
            const done = !!progress[key];
            return (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{l.title}</div>
                  <div style={{ color: done ? 'green' : '#666' }}>{done ? 'Завершён' : 'В процессе'}</div>
                </div>
                <Link className="btn" to={`/lessons/${l.id}`}>Открыть</Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Profile;
