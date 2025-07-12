const cors = require("cors");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");
const userRouter = require("./routes/user.routes");
const messageRoute = require("./routes/message.routes");

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://chat-client-six-tau.vercel.app'
  ],
  credentials: true,
};

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(userRouter);
app.use(messageRoute);
app.use(errorMiddleware);

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGODB_URI || process.env.VITE_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`DB connection error: ${error}`));

// Для Vercel serverless функции
const port = process.env.PORT || process.env.VITE_PORT || 5001;

// Экспортируем app для Vercel
module.exports = app;

// Запускаем сервер только если не на Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
  });
}
