import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password, name || undefined);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Регистрация</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem', maxWidth: 360 }}>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        <input type="text" placeholder="Имя (необязательно)" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Регистрация…' : 'Зарегистрироваться'}</button>
        <div>Уже есть аккаунт? <Link to="/login">Войти</Link></div>
      </form>
    </div>
  );
};

export default Register;
