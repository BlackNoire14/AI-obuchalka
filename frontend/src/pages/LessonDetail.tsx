import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { tasks } from '../data/tasks';

const LS_PROGRESS_KEY = 'codetutor.progress';

const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const lesson = useMemo(() => lessons.find(l => l.id === id) || lessons[0], [id]);

  const [progress, setProgress] = useState<Record<string, number>>({});
  const progressKey = `lesson:${lesson.id}`;

  // Инициализация прогресса из localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_PROGRESS_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
  }, []);

  // Если авторизован — подтянуть прогресс с сервера
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

  // Цели и викторина
  const [goalsChecked, setGoalsChecked] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  useEffect(() => {
    // сброс при смене урока
    setGoalsChecked({});
    setQuizAnswers({});
  }, [lesson.id]);

  const totalGoals = lesson.goals?.length || 0;
  const goalsDone = Object.values(goalsChecked).filter(Boolean).length;
  const totalQuiz = lesson.quiz?.length || 0;
  const quizCorrect = (lesson.quiz || []).reduce((acc, q) => {
    const a = quizAnswers[q.id];
    return acc + (a === q.answerIndex ? 1 : 0);
  }, 0);

  const completed = totalGoals > 0 || totalQuiz > 0
    ? (goalsDone === totalGoals) && (quizCorrect === totalQuiz)
    : true;

  const saveLessonProgress = async (value: number) => {
    const newProgress = { ...progress, [progressKey]: value };
    setProgress(newProgress);
    localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(newProgress));
    if (token) {
      try {
        await api.post('/api/progress', { data: newProgress });
      } catch {}
    }
  };

  useEffect(() => {
    // автообновление отметки завершения
    void saveLessonProgress(completed ? 1 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, lesson.id]);

  const onPrev = () => {
    const idx = lessons.findIndex(l => l.id === lesson.id);
    if (idx > 0) navigate(`/lessons/${lessons[idx - 1].id}`);
  };
  const onNext = () => {
    const idx = lessons.findIndex(l => l.id === lesson.id);
    if (idx >= 0 && idx < lessons.length - 1) navigate(`/lessons/${lessons[idx + 1].id}`);
  };

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1 style={{ marginBottom: 0 }}>{lesson.title}</h1>
        <Link to="/lessons" className="btn ghost">К списку уроков</Link>
      </div>
      <p style={{ color: '#555' }}>{lesson.summary}</p>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {lesson.sections.map((s, i) => (
          <section key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>{s.heading}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{s.text}</p>
            {s.code && (
              <pre className="output" style={{ marginTop: '0.5rem' }}>
                <code>{s.code}</code>
              </pre>
            )}
          </section>
        ))}
      </div>

      {lesson.goals && lesson.goals.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Цели урока</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
            {lesson.goals.map(g => (
              <li key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={!!goalsChecked[g.id]}
                  onChange={(e) => setGoalsChecked(v => ({ ...v, [g.id]: e.target.checked }))}
                />
                <span>{g.text}</span>
              </li>
            ))}
          </ul>
          <div style={{ color: '#666', marginTop: '0.5rem' }}>Выполнено целей: {goalsDone}/{totalGoals}</div>
        </div>
      )}

      {lesson.quiz && lesson.quiz.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Мини‑викторина</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {lesson.quiz.map(q => (
              <div key={q.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 600 }}>{q.question}</div>
                <div style={{ display: 'grid', gap: '0.25rem', marginTop: '0.5rem' }}>
                  {q.choices.map((c, idx) => (
                    <label key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={quizAnswers[q.id] === idx}
                        onChange={() => setQuizAnswers(v => ({ ...v, [q.id]: idx }))}
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
                {quizAnswers[q.id] != null && (
                  <div style={{ marginTop: '0.5rem', color: quizAnswers[q.id] === q.answerIndex ? 'green' : 'crimson' }}>
                    {quizAnswers[q.id] === q.answerIndex ? 'Верно!' : 'Неверно.'}
                    {q.explanation ? ` ${q.explanation}` : ''}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ color: '#666', marginTop: '0.5rem' }}>Правильных ответов: {quizCorrect}/{totalQuiz}</div>
        </div>
      )}

      {lesson.practiceIds && lesson.practiceIds.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Практика по теме</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {lesson.practiceIds.map(pid => {
              const t = tasks.find(x => x.id === pid);
              const label = t ? t.title : pid;
              return (
                <Link key={pid} className="btn" to={`/practice?task=${encodeURIComponent(pid)}`}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' }}>
        <button className="btn" onClick={onPrev} disabled={lessons[0].id === lesson.id}>Назад</button>
        <button className="btn primary" onClick={onNext} disabled={lessons[lessons.length - 1].id === lesson.id}>Далее</button>
        <Link className="btn ghost" to="/practice" style={{ marginLeft: 'auto' }}>Перейти к практике</Link>
        <span style={{ marginLeft: '1rem', color: completed ? 'green' : '#666' }}>
          Статус урока: {completed ? 'Завершён' : 'В процессе'}
        </span>
      </div>
    </div>
  );
};

export default LessonDetail;
