# Деплой на Render

## Backend (Node.js + Socket.IO)

### Шаги для деплоя backend:

1. **Создайте аккаунт на Render.com**
2. **Создайте новый Web Service**
3. **Подключите ваш GitHub репозиторий**
4. **Настройте следующие параметры:**
   - **Name:** chat-backend
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Переменные окружения для backend:
```
NODE_ENV=production
VITE_DB_URL=your_mongodb_atlas_connection_string
VITE_CLIENT_URL=https://your-frontend-render-url.onrender.com
VITE_PORT=10000
```

## Frontend (React + Vite)

### Шаги для деплоя frontend:

1. **Создайте новый Static Site на Render**
2. **Подключите ваш GitHub репозиторий**
3. **Настройте следующие параметры:**
   - **Name:** chat-frontend
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Plan:** Free

### Переменные окружения для frontend:
```
VITE_API_URL=https://your-backend-render-url.onrender.com
VITE_SOCKET_URL=https://your-backend-render-url.onrender.com
```

## Важные моменты:

1. **WebSocket поддержка:** Render поддерживает WebSocket, в отличие от Vercel
2. **CORS настройки:** Backend автоматически настроен для работы с Render
3. **Environment Variables:** Установите переменные окружения в настройках каждого сервиса
4. **Порядок деплоя:** Сначала деплойте backend, затем frontend

## После деплоя:

1. Получите URL вашего backend сервиса
2. Обновите переменные окружения frontend с правильными URL
3. Передеплойте frontend
4. Протестируйте WebSocket соединение

## Локальная разработка:

Для локальной разработки используйте:
```bash
# Backend
cd server
npm run dev

# Frontend  
cd client
npm run dev
``` 