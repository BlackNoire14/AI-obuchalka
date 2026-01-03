import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Practice from './pages/Practice';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import { useTheme } from './context/ThemeContext';

// Pages
const Home = () => (
  <div className="page">
    <h1>CodeTutor — обучающее приложение по программированию</h1>
    <p>
      Эта платформа помогает освоить основы JavaScript/TypeScript с нуля: от переменных и функций до
      асинхронности, структур данных и оценки сложности алгоритмов. Вы изучаете теорию, закрепляете её
      интерактивными задачами и отслеживаете прогресс.
    </p>
    <h2>Что умеет CodeTutor</h2>
    <ul>
      <li><b>Уроки с теорией</b>: кратко и по делу, с примерами кода.</li>
      <li><b>Практика с автопроверкой</b>: встроенный редактор, тесты и подсчёт результатов.</li>
      <li><b>ИИ‑подсказки</b>: наводящие рекомендации по решению (без полного решения).</li>
      <li><b>Трекинг прогресса</b>: сохраняется локально и на сервере после входа в аккаунт.</li>
      <li><b>Темы</b>: объекты и прототипы, ошибки/исключения, async/await, HTTP/API, структуры данных, сложность алгоритмов.</li>
    </ul>
    <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
      <Link className="btn primary" to="/lessons">Перейти к урокам</Link>
      <Link className="btn" to="/practice">Открыть практику</Link>
    </div>
  </div>
);

function App() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const onLogout = () => { logout(); navigate('/'); };
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-inner">
          <Link to="/" className="logo">CodeTutor</Link>
          <div className="nav-links">
          <Link to="/">Дашборд</Link>
          <Link to="/lessons">Уроки</Link>
          <Link to="/practice">Практика</Link>
          <Link to="/profile">Профиль</Link>
          <Link to="/settings">⚙️</Link>
          <button className="btn ghost" onClick={toggleTheme} title="Переключить тему">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <>
              <span style={{ marginLeft: '1rem', color: '#666' }}>{user.email}</span>
              <button className="btn ghost" onClick={onLogout} style={{ marginLeft: '0.5rem' }}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">Войти</Link>
              <Link to="/register">Регистрация</Link>
            </>
          )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2025 CodeTutor — Изучайте программирование с ИИ</p>
      </footer>
    </div>
  );
}

export default App;
