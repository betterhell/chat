const PORT = 5000
const DB_URL = 'mongodb+srv://betterhell:598213q@chatcluster.olsky05.mongodb.net/chatDB?retryWrites=true&w=majority';
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const httpServer = require("http").Server(app)
const movieRouter = require("./routes/movie.routes")
const userRouter = require("./routes/user.routes")

export let users = []

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(movieRouter)
app.use(userRouter)

mongoose
    .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(`DB connection error: ${error}`))

httpServer.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Server is up on port ${PORT}!`)
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


