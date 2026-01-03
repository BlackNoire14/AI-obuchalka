# 🚀 Деплой CodeTutor на GitHub Pages

## ⚠️ Важное замечание

GitHub Pages подходит **только для фронтенда**. Для полноценной работы приложения с авторизацией и сохранением прогресса на сервере нужен бэкенд.

### Варианты деплоя:

1. **GitHub Pages (только фронтенд)** - работает локально, без серверной авторизации
2. **Netlify + Render** (рекомендуется) - полноценное приложение с бэкендом

---

## 📋 Вариант 1: GitHub Pages (только фронтенд)

### Шаг 1: Подготовка репозитория

```bash
# Инициализируйте Git (если еще не сделано)
cd "c:\Users\User\Desktop\Ai obuchalka\code-tutor"
git init
git add .
git commit -m "Initial commit - CodeTutor 2.0"

# Создайте репозиторий на GitHub
# Затем добавьте remote
git remote add origin https://github.com/ВАШ_USERNAME/code-tutor.git
git branch -M main
git push -u origin main
```

### Шаг 2: Настройка package.json

Добавьте в `frontend/package.json`:

```json
{
  "homepage": "https://ВАШ_USERNAME.github.io/code-tutor",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Шаг 3: Установка gh-pages

```bash
cd frontend
npm install --save-dev gh-pages
```

### Шаг 4: Настройка для работы без бэкенда

Создайте файл `frontend/.env.production`:

```env
REACT_APP_API_BASE=
```

### Шаг 5: Деплой

```bash
cd frontend
npm run deploy
```

### Шаг 6: Настройка GitHub Pages

1. Перейдите в Settings → Pages
2. Source: выберите ветку `gh-pages`
3. Сохраните

Приложение будет доступно по адресу: `https://ВАШ_USERNAME.github.io/code-tutor`

---

## 📋 Вариант 2: Netlify + Render (рекомендуется)

Этот вариант дает полноценное приложение с авторизацией и сохранением прогресса.

### Преимущества:
✅ Работает авторизация  
✅ Прогресс сохраняется на сервере  
✅ ИИ-подсказки работают  
✅ Бесплатно  

### Инструкции:
Смотрите файлы:
- `QUICK_DEPLOY.md` - быстрая инструкция
- `DEPLOYMENT.md` - подробная инструкция

---

## 🔧 Автоматический деплой через GitHub Actions

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Build
      run: |
        cd frontend
        npm run build
        
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/build
```

---

## ⚙️ Настройка роутинга для GitHub Pages

Создайте `frontend/public/404.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CodeTutor</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

Обновите `frontend/public/index.html`, добавьте в `<head>`:

```html
<script type="text/javascript">
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

---

## 📝 Полная инструкция по шагам

### 1. Подготовка проекта

```bash
cd "c:\Users\User\Desktop\Ai obuchalka\code-tutor"

# Создайте .gitignore если его нет
echo "node_modules/
.env
.env.local
build/
dist/" > .gitignore
```

### 2. Обновите frontend/package.json

```json
{
  "name": "code-tutor-frontend",
  "version": "2.0.0",
  "homepage": "https://ВАШ_USERNAME.github.io/code-tutor",
  "private": true,
  "dependencies": {
    // ... существующие зависимости
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "gh-pages": "^6.1.0"
  }
}
```

### 3. Установите зависимости

```bash
cd frontend
npm install --save-dev gh-pages
```

### 4. Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Название: `code-tutor`
3. Public или Private
4. Не добавляйте README, .gitignore, license (уже есть)
5. Create repository

### 5. Загрузите код

```bash
cd "c:\Users\User\Desktop\Ai obuchalka\code-tutor"
git init
git add .
git commit -m "CodeTutor 2.0 - Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/code-tutor.git
git push -u origin main
```

### 6. Деплой на GitHub Pages

```bash
cd frontend
npm run deploy
```

### 7. Настройте GitHub Pages

1. Откройте https://github.com/ВАШ_USERNAME/code-tutor/settings/pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` → `/root`
4. Save

### 8. Проверьте деплой

Через 2-3 минуты приложение будет доступно:
`https://ВАШ_USERNAME.github.io/code-tutor`

---

## ⚠️ Ограничения GitHub Pages версии

### Что работает:
✅ Все задачи и уроки  
✅ Локальное сохранение прогресса  
✅ Темная тема  
✅ Настройки  
✅ Экспорт/импорт прогресса  
✅ Дашборд и достижения  

### Что НЕ работает:
❌ Регистрация и авторизация  
❌ Синхронизация прогресса между устройствами  
❌ ИИ-подсказки  
❌ Сохранение на сервере  

### Решение:
Используйте **Netlify + Render** для полноценной версии (см. `DEPLOYMENT.md`)

---

## 🔄 Обновление деплоя

После внесения изменений:

```bash
git add .
git commit -m "Описание изменений"
git push

cd frontend
npm run deploy
```

---

## 🆘 Решение проблем

### Ошибка: "Failed to get remote.origin.url"
```bash
git remote add origin https://github.com/ВАШ_USERNAME/code-tutor.git
```

### Ошибка: "gh-pages not found"
```bash
cd frontend
npm install --save-dev gh-pages
```

### Страница показывает 404
1. Проверьте настройки GitHub Pages
2. Убедитесь, что ветка `gh-pages` создана
3. Подождите 2-3 минуты

### Роутинг не работает
Убедитесь, что создали `404.html` и обновили `index.html`

---

## 📊 Сравнение вариантов деплоя

| Функция | GitHub Pages | Netlify + Render |
|---------|--------------|------------------|
| Фронтенд | ✅ | ✅ |
| Бэкенд | ❌ | ✅ |
| Авторизация | ❌ | ✅ |
| База данных | ❌ | ✅ |
| ИИ-подсказки | ❌ | ✅ |
| Бесплатно | ✅ | ✅ |
| Сложность | Легко | Средне |

---

## ✅ Чек-лист деплоя

- [ ] Создан репозиторий на GitHub
- [ ] Обновлен `package.json` с `homepage`
- [ ] Установлен `gh-pages`
- [ ] Создан `.gitignore`
- [ ] Код загружен на GitHub
- [ ] Выполнен `npm run deploy`
- [ ] Настроены GitHub Pages
- [ ] Проверена работа приложения

---

## 🎯 Готово!

Ваше приложение теперь доступно по адресу:
**https://ВАШ_USERNAME.github.io/code-tutor**

Для полноценной версии с бэкендом используйте **Netlify + Render**.
