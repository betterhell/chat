const cors = require("cors");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const httpServer = require("http").Server(app);
const errorMiddleware = require("./middlewares/error.middleware");
const userRouter = require("./routes/user.routes");
const messageRoute = require("./routes/message.routes");
import { Server } from "socket.io";

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://client-seven-sage.vercel.app',
    process.env.VITE_CLIENT_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Additional CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://client-seven-sage.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(userRouter);
app.use(messageRoute);
app.use(errorMiddleware);

mongoose
  .connect(process.env.VITE_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`DB connection error: ${error}`));

const port = process.env.VITE_PORT || 5001;

httpServer.listen(port, (err) => {
  err ? console.log(err) : console.log(`Server is up on port ${port}!`);
});

//socket.io connectio
const io = new Server(httpServer, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users: any[] = [];

io.on("connection", (socket) => {
  console.log(`User with id ${socket.id} is connected!`);

  socket.on("user:connect", (user: any) => {
    !users.some((usr: any) => usr._id === user._id) &&
      users.push({
        ...user,
        socketId: socket.id,
      });
    io.emit("user:responseUsers", users);
  });

  socket.on("user:disconnect", (leavingUser: any) => {
    users = users.filter((user: any) => user._id !== leavingUser._id);
    io.emit("user:responseUsers", users);
  });

  socket.on("user:connectingAlert", (username: string) => {
    socket.broadcast.emit(
      "user:responseConnectMessage",
      `${username} has joined the chat!`
    );
  });

  socket.on("user:disconnectingAlert", (username: string) => {
    socket.broadcast.emit(
      "user:responseDisconnectMessage",
      `${username} has left the chat!`
    );
  });

  socket.on("message:createMessage", (message: any) => {
    io.emit("message:responseMessage", message);
  });

  socket.on("message:startTyping", (data: any) => {
    socket.broadcast.emit("message:responseStartTyping", data);
  });
  socket.on("message:endTyping", (data: any) => {
    socket.broadcast.emit("message:responseEndTyping", data);
  });
});
