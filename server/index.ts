import express from "express"
import http from "http"
import {Server} from "socket.io";
import cors from "cors"

import route from "./route"

const app = express()

app.use(cors({origin: "*"}))
app.use(route)

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on('join', ({username, room}) => {
        socket.join(room)

        socket.emit('message', {
            data: {
                user: {
                    name: "Admin",
                    message: `Hey kekw ${username}`
                }
            }
        })
    })

    io.on('disconnect', () => {
        console.log('Disconnected')
    })
})

server.listen(5000, () => {
    console.log('Server is running!')
})