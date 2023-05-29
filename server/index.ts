import {Request, Response} from "express";

const PORT = 5000
const cors = require("cors")
const express = require("express")

const app = express()
const httpServer = require("http").Server(app)
const {connectToDb, getDb} = require("./db")

app.use(cors());

export let users = []

let db

connectToDb((error) => {
    if (!error) {
        httpServer.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Server is up on port ${PORT}!`)
        })
        db = getDb()
    } else {
        console.log(`DB connection error: ${error}`)
    }
})

app.get('/', (req: Request, res: Response) => {

    res.send('Hello API!')
})

app.get('/movies', (req: Request, res: Response) => {
    const movies = []

    db
        .collection("movies")
        .find()
        .forEach((movie) => movies.push(movie))
        .then(() => {
            res
                .status(200)
                .json(movies)
        })
        .catch(() => {
            res
                .status(500)
                .json({error: "Something went wrong... Try later."})
        })
})

//socket.io connection
const io = require("socket.io")(httpServer, {
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

