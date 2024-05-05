const express = require("express");
const app = express();
const cors = require("cors");

// app.use(cors())

const server = require("http").createServer(app);
const {Server} = require("socket.io");
const { addUser } = require("./utils/users");

const io = new Server(server);

app.get('/', (req, res) => {
    res.send("Collaborative Canvas App");
})

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
    // console.log("User Connected");
    socket.on("userJoined", (data) => {
        const {name, userID, roomID, host, presenter} = data;
        roomIdGlobal = roomID;
        socket.join(roomID);
        const users = addUser(data);
        socket.emit("userIsJoined", { success: true, users });
        socket.broadcast.to(roomID).emit("allUsers", users);
        socket.broadcast.to(roomID).emit("canvasDataResponse", {
            imgURL: imgURLGlobal,
        })
    })
    socket.on("canvasData", (data) => {
        imgURLGlobal = data;
        socket.broadcast.to(roomIdGlobal).emit("canvasDataResponse", {
            imgURL: data,
        })
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is Up and Running at Port: ${PORT}`);
})