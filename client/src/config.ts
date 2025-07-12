// Конфигурация для разных окружений
const isDevelopment = import.meta.env.DEV;

export const API_URL = isDevelopment 
  ? "http://localhost:5001" 
  : "https://chat-server-26iu3fe4w-betterhells-projects.vercel.app";

export const SOCKET_URL = isDevelopment 
  ? "http://localhost:5001" 
  : "https://chat-server-26iu3fe4w-betterhells-projects.vercel.app";