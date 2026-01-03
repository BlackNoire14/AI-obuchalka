# 🚀 Команды для деплоя на GitHub Pages

## Быстрый деплой (копируйте и выполняйте)

### 1. Обновите frontend/package.json

Откройте `frontend/package.json` и добавьте/обновите:

```json
{
  "homepage": "https://ВАШ_USERNAME.github.io/code-tutor",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

**Замените `ВАШ_USERNAME` на ваш GitHub username!**

### 2. Установите gh-pages

```powershell
cd "c:\Users\User\Desktop\Ai obuchalka\code-tutor\frontend"
npm install --save-dev gh-pages
```

### 3. Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Repository name: `code-tutor`
3. Public
4. НЕ добавляйте README, .gitignore, license
5. Create repository

### 4. Инициализируйте Git и загрузите код

```powershell
cd "c:\Users\User\Desktop\Ai obuchalka\code-tutor"

# Инициализация
git init

# Добавить все файлы
git add .

# Коммит
git commit -m "CodeTutor 2.0 - Initial commit"

# Переименовать ветку в main
git branch -M main

# Добавить remote (ЗАМЕНИТЕ ВАШ_USERNAME!)
git remote add origin https://github.com/ВАШ_USERNAME/code-tutor.git

# Загрузить на GitHub
git push -u origin main
```

### 5. Деплой на GitHub Pages

```powershell
cd "c:\Users\User\Desktop\Ai obuchalka\code-tutor\frontend"
npm run deploy
```

### 6. Настройте GitHub Pages

1. Откройте: `https://github.com/ВАШ_USERNAME/code-tutor/settings/pages`
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** → **/root**
4. Save

### 7. Проверьте результат

Через 2-3 минуты откройте:
`https://ВАШ_USERNAME.github.io/code-tutor`

---

## Обновление после изменений

```powershell
cd "c:\Users\User\Desktop\Ai obuchalka\code-tutor"

# Добавить изменения
git add .

# Коммит
git commit -m "Описание изменений"

# Загрузить на GitHub
git push

# Деплой обновленной версии
cd frontend
npm run deploy
```

---

## Если возникли проблемы

### Ошибка: "remote origin already exists"

```powershell
git remote remove origin
git remote add origin https://github.com/ВАШ_USERNAME/code-tutor.git
```

### Ошибка: "gh-pages not found"

```powershell
cd frontend
npm install --save-dev gh-pages
```

### Страница показывает 404

1. Проверьте настройки GitHub Pages
2. Убедитесь, что выбрана ветка `gh-pages`
3. Подождите 2-3 минуты

---

## ✅ Готово!

Ваше приложение доступно по адресу:
**https://ВАШ_USERNAME.github.io/code-tutor**

Полная инструкция: `GITHUB_PAGES_DEPLOY.md`
