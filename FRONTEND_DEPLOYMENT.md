# 🚀 Развертывание фронтенда

## ✅ Что уже сделано

1. **Обновлена конфигурация API** - фронтенд теперь обращается к Vercel бэкенду
2. **Создан файл `config.ts`** - автоматическое переключение между dev и prod
3. **Исправлены все импорты** - фронтенд готов к деплою

## 🎯 Варианты развертывания фронтенда

### 1. **Vercel** (Рекомендуется)
```bash
# В папке client
npm install -g vercel
vercel login
vercel --prod
```

### 2. **Netlify**
```bash
# Соберите проект
npm run build

# Загрузите папку dist на netlify.com
# Или используйте Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### 3. **GitHub Pages**
```bash
# Добавьте в package.json
"homepage": "https://your-username.github.io/your-repo",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Установите gh-pages
npm install --save-dev gh-pages

# Деплой
npm run deploy
```

### 4. **Firebase Hosting**
```bash
# Установите Firebase CLI
npm install -g firebase-tools

# Инициализируйте проект
firebase login
firebase init hosting

# Деплой
firebase deploy
```

## 🔧 Конфигурация

### Файл `config.ts` автоматически переключается:
- **В разработке:** `http://localhost:5001`
- **В продакшене:** `https://chat-server-dds0r4neo-betterhells-projects.vercel.app`

### Для кастомных доменов:
```typescript
// config.ts
export const API_URL = isDevelopment 
  ? "http://localhost:5001" 
  : "https://your-custom-domain.com";

export const SOCKET_URL = isDevelopment 
  ? "http://localhost:5001" 
  : "https://your-custom-domain.com";
```

## 🚀 Быстрый деплой на Vercel

```bash
cd client
vercel --prod
```

После деплоя получите URL вида:
`https://your-frontend-app.vercel.app`

## 🔗 Связывание фронтенда и бэкенда

1. **Обновите CORS в бэкенде** (если нужно):
   ```typescript
   // В server/index.ts
   const corsOptions = {
     origin: [
       'http://localhost:5173', // dev
       'https://your-frontend-app.vercel.app' // prod
     ],
     credentials: true,
   };
   ```

2. **Обновите переменные окружения в бэкенде:**
   ```
   VITE_CLIENT_URL=https://your-frontend-app.vercel.app
   ```

## 📋 Чек-лист

- [ ] Фронтенд собран (`npm run build`)
- [ ] API_URL настроен правильно
- [ ] SOCKET_URL настроен правильно
- [ ] CORS настроен в бэкенде
- [ ] Переменные окружения обновлены
- [ ] Домен настроен (опционально)

## 🎉 Результат

После деплоя у вас будет:
- **Бэкенд:** `https://chat-server-dds0r4neo-betterhells-projects.vercel.app`
- **Фронтенд:** `https://your-frontend-app.vercel.app`

Приложение полностью работает в продакшене! 🚀 