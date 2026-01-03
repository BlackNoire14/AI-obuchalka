# Быстрый деплой CodeTutor (5 минут)

## Шаг 1: MongoDB Atlas (2 минуты)

1. Зарегистрируйтесь на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Создайте FREE кластер (M0)
3. Создайте пользователя БД (сохраните пароль!)
4. Network Access → Allow Access from Anywhere (0.0.0.0/0)
5. Скопируйте строку подключения:
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/code-tutor?retryWrites=true&w=majority
   ```

## Шаг 2: GitHub (1 минута)

```bash
cd code-tutor
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ВАШ_USERNAME/code-tutor.git
git push -u origin main
```

## Шаг 3: Backend на Render (2 минуты)

1. Зарегистрируйтесь на [Render.com](https://render.com/)
2. New + → Web Service → подключите GitHub репозиторий
3. Настройки:
   - Name: `code-tutor-backend`
   - Root Directory: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm start`
4. Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=ваша_строка_из_шага_1
   JWT_SECRET=любая_длинная_случайная_строка_минимум_32_символа
   JWT_EXPIRES_IN=30d
   FRONTEND_URL=http://localhost:3000
   ```
5. Create Web Service
6. Скопируйте URL: `https://code-tutor-backend.onrender.com`

## Шаг 4: Frontend на Netlify (2 минуты)

1. Обновите `frontend/.env`:
   ```
   REACT_APP_API_BASE=https://code-tutor-backend.onrender.com
   ```
2. Закоммитьте:
   ```bash
   git add frontend/.env
   git commit -m "Update API URL"
   git push
   ```
3. Зарегистрируйтесь на [Netlify](https://www.netlify.com/)
4. Add new site → Import from GitHub → выберите репозиторий
5. Настройки:
   - Base directory: `frontend`
   - Build: `npm run build`
   - Publish: `frontend/build`
   - Environment: `REACT_APP_API_BASE=https://code-tutor-backend.onrender.com`
6. Deploy site
7. Скопируйте URL: `https://ваш-сайт.netlify.app`

## Шаг 5: Обновите CORS (30 секунд)

1. Вернитесь в Render → ваш backend service
2. Environment → обновите `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://ваш-сайт.netlify.app
   ```
3. Save (автоматически перезапустится)

## ✅ Готово!

Откройте `https://ваш-сайт.netlify.app` и пользуйтесь!

---

📖 **Подробная инструкция**: [DEPLOYMENT.md](DEPLOYMENT.md)
