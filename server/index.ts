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
const io = require("socket.io")(httpServer, {
    connectionStateRecovery: {
        // the backup duration of the sessions and the packets
        maxDisconnectionDuration: Infinity,
        // whether to skip middlewares upon successful recovery
        skipMiddlewares: true
    },
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const rooms = new Map()

let users = [
    {username: "Vasyan", email: "cock@mail.com", id: "32125912791027510957910"}
]

io.on("connection", (socket) => {
    console.log(`User with id ${socket.id} is connected!`)

    socket.on("connect", (user: any) => {
        users.push(user)
        io.emit("user:responseNewUserList", users)
    })

    socket.on('disconnect', (leavingUser: any) => {
        users = users.filter((user) => user.id !== leavingUser._id)
        io.emit("user:responseNewUserList", users)
    })

    socket.on("user:connectMessage", (username: string) => {
        socket.broadcast.emit("user:responseConnectMessage", `${username} has joined the chat!`)
    })
    socket.on("user:disconnectMessage", (username: string) => {
        socket.broadcast.emit("user:responseDisconnectMessage", `${username} has left the chat!`)
    })

    socket.on("message:createMessage", (data: any) => {
        io.emit("message:responseMessage", data)
    })

    socket.on('message:startTyping', (data: any) => {
        socket.broadcast.emit('message:responseStartTyping', data)
    })
    socket.on('message:endTyping', (data: any) => {
        socket.broadcast.emit('message:responseEndTyping', data)
    })
})




