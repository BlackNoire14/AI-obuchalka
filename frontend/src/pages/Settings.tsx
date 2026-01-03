import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './settings.css';

const Settings: React.FC = () => {
  const { theme, toggleTheme, fontSize, setFontSize } = useTheme();

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value, 10));
  };

  const clearProgress = () => {
    if (window.confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие необратимо.')) {
      localStorage.removeItem('codetutor.progress');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('codetutor.code.')) {
          localStorage.removeItem(key);
        }
      });
      alert('Прогресс успешно сброшен!');
      window.location.reload();
    }
  };

  const exportProgress = () => {
    const progress = localStorage.getItem('codetutor.progress');
    if (!progress) {
      alert('Нет данных для экспорта');
      return;
    }
    
    const dataStr = JSON.stringify(JSON.parse(progress), null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `codetutor-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          localStorage.setItem('codetutor.progress', JSON.stringify(data));
          alert('Прогресс успешно импортирован!');
          window.location.reload();
        } catch (err) {
          alert('Ошибка при импорте файла');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="page settings">
      <h1>Настройки</h1>

      <section className="settings-section">
        <h2>Внешний вид</h2>
        
        <div className="setting-item">
          <div className="setting-label">
            <strong>Тема оформления</strong>
            <p className="setting-desc">Переключение между светлой и темной темой</p>
          </div>
          <button className="btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Темная тема' : '☀️ Светлая тема'}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <strong>Размер шрифта редактора</strong>
            <p className="setting-desc">Текущий размер: {fontSize}px</p>
          </div>
          <div className="font-size-control">
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={handleFontSizeChange}
              className="font-size-slider"
            />
            <div className="font-size-labels">
              <span>12px</span>
              <span>18px</span>
              <span>24px</span>
            </div>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2>Данные и прогресс</h2>
        
        <div className="setting-item">
          <div className="setting-label">
            <strong>Экспорт прогресса</strong>
            <p className="setting-desc">Сохранить прогресс в файл для резервной копии</p>
          </div>
          <button className="btn" onClick={exportProgress}>
            📥 Экспортировать
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <strong>Импорт прогресса</strong>
            <p className="setting-desc">Загрузить прогресс из файла</p>
          </div>
          <button className="btn" onClick={importProgress}>
            📤 Импортировать
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <strong>Сброс прогресса</strong>
            <p className="setting-desc danger">Удалить весь прогресс и начать заново</p>
          </div>
          <button className="btn danger" onClick={clearProgress}>
            🗑️ Сбросить всё
          </button>
        </div>
      </section>

      <section className="settings-section">
        <h2>О приложении</h2>
        <div className="about-info">
          <p><strong>CodeTutor</strong> — обучающая платформа для изучения программирования</p>
          <p>Версия: 2.0.0</p>
          <p>19 практических задач • 10 уроков • Система достижений</p>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            © 2025 CodeTutor. Создано для изучения JavaScript/TypeScript
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
