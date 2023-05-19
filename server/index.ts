import {Request, Response} from "express";

const PORT = 5000
const cors = require("cors")
const express = require("express")
const app = express()
const httpServer = require("http").Server(app)

app.use(cors());

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
    client.on("message", (data) => {
        io.emit("response", data)
    })
})

httpServer.listen(PORT, () => {
    console.log('Server is up!')
})
