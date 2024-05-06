const express = require("express");
const app = express();
const cors = require("cors");

// app.use(cors())

const server = require("http").createServer(app);
const {Server} = require("socket.io");
const { addUser, removeUser, getUser, users } = require("./utils/users");

const io = new Server(server);

app.use(() => {
    console.log(users);
})

app.get('/', (req, res) => {
    res.send("Real time Canvas Sharing App...");
})

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
    // console.log("User Connected");
    socket.on("userJoined", (data) => {
        const {name, userID, roomID, host, presenter} = data;
        roomIdGlobal = roomID;
        socket.join(roomID);
        const users = addUser({name, userID, roomID, host, presenter, socketId: socket.id});
        socket.emit("userIsJoined", { success: true, users });
        socket.broadcast.to(roomID).emit("userJoinedMsg", name);
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
    socket.on("message", (data) => {
        const {msg} = data;
        const user = getUser(socket.id);
        if(user) {
            socket.broadcast.to(roomIdGlobal).emit("msgResponse", {msg, name: user.name});
        }
    })
    socket.on("disconnect", () => {
        const user = getUser(socket.id);
        if(user) {
            removeUser(socket.id);
            socket.broadcast.to(roomIdGlobal).emit("userLeftMsg", user.name);
        }
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is Up and Running at Port: ${PORT}`);
})