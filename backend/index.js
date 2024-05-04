const express = require("express");
const app = express();
const cors = require("cors");

// app.use(cors())

const server = require("http").createServer(app);
const {Server} = require("socket.io");

const io = new Server(server);

app.get('/', (req, res) => {
    res.send("Collaborative Canvas App");
})

io.on("connection", (socket) => {
    // console.log("User Connected");
    socket.on("userJoined", (data) => {
        const {name, userID, roomID, host, presenter} = data;
        socket.join(roomID);
        socket.emit("userIsJoined", { success: true })
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is Up and Running at Port: ${PORT}`);
})