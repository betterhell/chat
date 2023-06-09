const cors = require("cors")
const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const httpServer = require("http").Server(app)
const errorMiddleware = require("./middlewares/error.middleware")
const userRouter = require("./routes/user.routes")
const messageRoute = require("./routes/message.routes")

export let users = []

const corsOptions = {
    origin: process.env.VITE_CLIENT_URL,
    credentials: true,
}

app.use(express.json())
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(userRouter)
app.use(messageRoute)
app.use(errorMiddleware)

mongoose
    .connect(process.env.VITE_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(`DB connection error: ${error}`))


const port = process.env.VITE_PORT || 5000
httpServer.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server is up on port ${port}!`)
})

//socket.io connection
export const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (client) => {
    console.log(`User with id ${client.id} is connected!`)
    client.on("disconnect", () => {
        console.log(`User with id ${client.id} is disconnected!`)
    })
    client.on("message", (data: any) => {
        io.emit("response", data)
    })

    // io.of("/").adapter.on("create-room", (room) => {
    //     console.log(`room ${room} was created`);
    // });
    //
    // io.of("/chat").adapter.on("join-room", (room, id) => {
    //     console.log(`socket ${id} has joined room ${room}`);
    // })
    client.on("newUser", (data) => {
        users.push(data)
        io.emit('connectNewUser', users)
    })
    client.on('disconnectUser', (data) => {
        users = users.filter((user) => user.id !== data?.id)
        io.emit("disconnected", users)
    })

    client.on('startTyping', (data) => {
        io.emit('responseStartTyping', data)
    })
    client.on('endTyping', (data) => {
        io.emit('responseEndTyping', data)
    })
})


