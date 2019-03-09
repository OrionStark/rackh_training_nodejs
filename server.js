const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const socketIO = require('socket.io')(server);
const router = require('./routes/routes')
const database = require('./database/database')

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use(router)

/* User connected namespace */
let userConnected = socketIO.of("/user/connected")
let userCount = 0
userConnected.on("connection", (socket) => {
    userCount += 1
    userConnected.emit("user_update", {user_count: userCount})
    socket.on("disconnect", () => {
        userCount -= 1
        userConnected.emit("user_update", {user_count: userCount})
    })
})

server.listen(process.env.PORT || 8888, () => {
    console.log("Server has started on port " + "8888")
})