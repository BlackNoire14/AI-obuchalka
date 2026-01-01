import React from 'react';
import { Link } from 'react-router-dom';
import { lessons } from '../data/lessons';

const Lessons: React.FC = () => {
  return (
    <div className="page">
      <h1>Уроки программирования</h1>
      <p>Последовательно изучайте темы и переходите к практике.</p>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {lessons.map((l) => (
          <div key={l.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem' }}>
            <h3 style={{ margin: 0 }}>{l.title}</h3>
            <p style={{ margin: '0.5rem 0 1rem' }}>{l.summary}</p>
            <Link className="btn" to={`/lessons/${l.id}`}>Открыть</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
