import {Request, Response} from "express";


const PORT = 5000
const cors = require("cors")
const express = require("express")
const app = express()
const httpServer = require("http").Server(app)

app.use(cors());

export let users = []

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello API!')
})

//socket.io connection
io.on("connection", (client: any) => {
    console.log(`User with id ${client.id} is connected!`)
    client.on("disconnect", () => {
        console.log(`User with id ${client.id} is disconnected!`)
    })
    client.on("message", (data: any) => {
        console.log(data)
        io.emit("response", data)
    })
    client.on("newUser", (data) => {
        users.push(data)
        io.emit('connectNewUser', users)
    })
    client.on('disconnectUser', (data) => {
        if (users.length <= 1) {
            users = users?.filter((user: any) => user.id !== data.id)
        }
        io.emit("disconnected", users)
    })
    client.on('startTyping', (data) => {
        io.emit('responseStartTyping', data)
    })
    client.on('endTyping', (data) => {
        io.emit('responseEndTyping', data)
    })
})

httpServer.listen(PORT, () => {
    console.log('Server is up!')
})
