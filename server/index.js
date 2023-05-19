"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PORT = 5000;
var cors = require("cors");
var express = require("express");
var app = express();
var httpServer = require("http").Server(app);
app.use(cors());
var io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.get('/', function (req, res) {
    res.send('Hello API!');
});
//socket.io connection
io.on("connection", function (client) {
    console.log("User with id ".concat(client.id, " is connected!"));
    client.on("disconnect", function () {
        console.log("User with id ".concat(client.id, " is disconnected!"));
    });
    client.on("message", function (data) {
        io.emit("response", data);
    });
});
httpServer.listen(PORT, function () {
    console.log('Server is up!');
});
