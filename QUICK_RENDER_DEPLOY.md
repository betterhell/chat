# Быстрый деплой на Render

## 1. Backend (Web Service)

1. Зайдите на [render.com](https://render.com)
2. Создайте новый **Web Service**
3. Подключите GitHub репозиторий
4. Настройки:
   - **Name:** `chat-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

### Environment Variables:
```
NODE_ENV=production
VITE_DB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
VITE_CLIENT_URL=https://your-frontend-url.onrender.com
VITE_PORT=10000
```

## 2. Frontend (Static Site)

1. Создайте новый **Static Site**
2. Подключите тот же GitHub репозиторий
3. Настройки:
   - **Name:** `chat-frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Plan:** `Free`

### Environment Variables:
```
VITE_API_URL=https://your-backend-url.onrender.com
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

## 3. Порядок действий:

1. **Деплойте backend первым**
2. **Скопируйте URL backend** (например: `https://chat-backend-abc123.onrender.com`)
3. **Обновите переменные frontend** с URL backend
4. **Деплойте frontend**
5. **Скопируйте URL frontend** (например: `https://chat-frontend-xyz789.onrender.com`)
6. **Обновите переменную backend** `VITE_CLIENT_URL` с URL frontend
7. **Передеплойте backend**

## 4. Тестирование:

После деплоя протестируйте:
- Регистрацию пользователей
- Вход в систему
- Отправку сообщений
- Real-time обновления через WebSocket

## 5. Локальная разработка:

```bash
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

**Примечание:** WebSocket будет работать только на Render, не на Vercel! 