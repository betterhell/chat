// Конфигурация для разных окружений
const isDevelopment = import.meta.env.DEV;

export const API_URL = isDevelopment 
  ? "http://localhost:5001" 
  : "https://server-j8g4qmzsw-betterhells-projects.vercel.app";

export const SOCKET_URL = isDevelopment 
  ? "http://localhost:5001" 
  : "https://server-j8g4qmzsw-betterhells-projects.vercel.app";