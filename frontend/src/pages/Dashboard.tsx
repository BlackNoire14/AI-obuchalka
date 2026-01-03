import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { tasks } from '../data/tasks';
import { lessons } from '../data/lessons';
import { achievements, calculateUserStats, getUnlockedAchievements } from '../data/achievements';
import './dashboard.css';

const LS_PROGRESS_KEY = 'codetutor.progress';

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_PROGRESS_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
  }, []);

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

  const stats = calculateUserStats(progress);
  const unlockedAchievements = getUnlockedAchievements(stats);

  // Статистика по задачам
  const completedTasks = tasks.filter(t => progress[t.id] === t.tests.length);
  const inProgressTasks = tasks.filter(t => progress[t.id] > 0 && progress[t.id] < t.tests.length);
  const notStartedTasks = tasks.filter(t => !progress[t.id] || progress[t.id] === 0);

  // Статистика по урокам
  const completedLessons = lessons.filter(l => progress[`lesson:${l.id}`] === 1);
  const inProgressLessons = lessons.filter(l => !progress[`lesson:${l.id}`]);

  // Прогресс по категориям
  const categories = Array.from(new Set(tasks.map(t => t.category).filter(Boolean)));
  const categoryProgress = categories.map(cat => {
    const catTasks = tasks.filter(t => t.category === cat);
    const completed = catTasks.filter(t => progress[t.id] === t.tests.length).length;
    return { category: cat, total: catTasks.length, completed, percentage: Math.round((completed / catTasks.length) * 100) };
  });

  // Прогресс по сложности
  const difficultyProgress = [
    { level: 'easy', label: 'Легкие', completed: tasks.filter(t => t.difficulty === 'easy' && progress[t.id] === t.tests.length).length, total: tasks.filter(t => t.difficulty === 'easy').length },
    { level: 'medium', label: 'Средние', completed: tasks.filter(t => t.difficulty === 'medium' && progress[t.id] === t.tests.length).length, total: tasks.filter(t => t.difficulty === 'medium').length },
    { level: 'hard', label: 'Сложные', completed: tasks.filter(t => t.difficulty === 'hard' && progress[t.id] === t.tests.length).length, total: tasks.filter(t => t.difficulty === 'hard').length },
  ];

  const totalProgress = Math.round((completedTasks.length / tasks.length) * 100);
  const lessonsProgress = Math.round((completedLessons.length / lessons.length) * 100);

  return (
    <div className="page dashboard">
      <h1>Дашборд</h1>
      {user && <p className="welcome">Добро пожаловать, <strong>{user.email}</strong>!</p>}

      {/* Общая статистика */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{completedTasks.length}/{tasks.length}</div>
            <div className="stat-label">Задач решено</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${totalProgress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{completedLessons.length}/{lessons.length}</div>
            <div className="stat-label">Уроков завершено</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${lessonsProgress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">{unlockedAchievements.length}/{achievements.length}</div>
            <div className="stat-label">Достижений</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.currentStreak}</div>
            <div className="stat-label">Дней подряд</div>
          </div>
        </div>
      </div>

      {/* Прогресс по сложности */}
      <section className="dashboard-section">
        <h2>Прогресс по уровням сложности</h2>
        <div className="difficulty-grid">
          {difficultyProgress.map(d => (
            <div key={d.level} className={`difficulty-card ${d.level}`}>
              <h3>{d.label}</h3>
              <div className="big-stat">{d.completed}/{d.total}</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.round((d.completed / d.total) * 100)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Прогресс по категориям */}
      <section className="dashboard-section">
        <h2>Прогресс по категориям</h2>
        <div className="category-list">
          {categoryProgress.map(cat => (
            <div key={cat.category} className="category-item">
              <div className="category-header">
                <span className="category-name">{cat.category}</span>
                <span className="category-stats">{cat.completed}/{cat.total}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${cat.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Достижения */}
      <section className="dashboard-section">
        <h2>Достижения</h2>
        <div className="achievements-grid">
          {achievements.map(ach => {
            const unlocked = unlockedAchievements.some(a => a.id === ach.id);
            return (
              <div key={ach.id} className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon">{unlocked ? ach.icon : '🔒'}</div>
                <div className="achievement-content">
                  <div className="achievement-title">{ach.title}</div>
                  <div className="achievement-desc">{ach.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Быстрые действия */}
      <section className="dashboard-section">
        <h2>Быстрые действия</h2>
        <div className="quick-actions">
          {inProgressTasks.length > 0 && (
            <Link to={`/practice?task=${inProgressTasks[0].id}`} className="action-card">
              <div className="action-icon">▶️</div>
              <div className="action-content">
                <div className="action-title">Продолжить задачу</div>
                <div className="action-desc">{inProgressTasks[0].title}</div>
              </div>
            </Link>
          )}
          {notStartedTasks.length > 0 && (
            <Link to={`/practice?task=${notStartedTasks[0].id}`} className="action-card">
              <div className="action-icon">🆕</div>
              <div className="action-content">
                <div className="action-title">Новая задача</div>
                <div className="action-desc">{notStartedTasks[0].title}</div>
              </div>
            </Link>
          )}
          {inProgressLessons.length > 0 && (
            <Link to={`/lessons/${inProgressLessons[0].id}`} className="action-card">
              <div className="action-icon">📖</div>
              <div className="action-content">
                <div className="action-title">Продолжить урок</div>
                <div className="action-desc">{inProgressLessons[0].title}</div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
