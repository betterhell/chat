import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {handleError} from "./handlers/handleError";
import {handleResponse} from "./handlers/handleResponse";

const PORT = 5000
const cors = require("cors")
const express = require("express")

const app = express()
const httpServer = require("http").Server(app)
const {connectToDb, getDb} = require("./db")

app.use(cors());
app.use(express.json())

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

// get all movies
app.get('/movies', (req: Request, res: Response) => {
    const movies = []

    db
        .collection("movies")
        .find()
        .forEach((movie) => movies.push(movie))
        .then(() => handleResponse(res, 200, movies))
        .catch(() => handleError(res, "Something went wrong... Try later."))
})

// get one movie
app.get('/movies/:id', (req: Request, res: Response) => {
    const movieId = req.params.id

    if (ObjectId.isValid(movieId)) {
        db
            .collection("movies")
            .findOne({_id: new ObjectId(movieId)})
            .then((document) => handleResponse(res, 200, document))
            .catch(() => handleError(res, "Something went wrong... Try later."))
    } else {
        handleError(res, "ID is not valid!")
    }
})

// delete movie
app.delete('/movies/:id', (req: Request, res: Response) => {
    const movieId = req.params.id

    if (ObjectId.isValid(movieId)) {
        db
            .collection("movies")
            .deleteOne({_id: new ObjectId(movieId)})
            .then(() => handleResponse(res, 200, "Movie successful delete!"))
            .catch(() => handleError(res, "Something went wrong... Try later."))
    } else {
        handleError(res, "ID is not valid!")
    }
})


// post new movie
app.post('/movies', (req: Request, res: Response) => {
    const newMovie = req.body

    db
        .collection("movies")
        .insertOne(newMovie)
        .then((result) => handleResponse(res, 201, `New movie with id = ${result.insertedId} added!`))
        .catch(() => handleError(res, "Something went wrong... Try later."))
})

// update movie
app.patch('/movies/:id', (req: Request, res: Response) => {
    const movieId = req.params.id
    const updatedMovieInfo = req.body

    if (ObjectId.isValid(movieId)) {
        db
            .collection("movies")
            .updateOne({_id: new ObjectId(movieId)}, {$set: updatedMovieInfo})
            .then(() => handleResponse(res, 200, `Movie successful with id ${movieId} updated!`))
            .catch(() => handleError(res, "Something went wrong... Try later."))
    } else {
        handleError(res, "ID is not valid!")
    }
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

