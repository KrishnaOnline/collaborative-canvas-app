const express = require("express");
const app = express();

const server = require("http").createServer(app);
const {Server} = require("socket.io");

const io = new Server(server);

app.get('/', (req, res) => {
    res.send("Collaborative Canvas App");
})

io.on("connection", (socket) => {
    console.log("User Connected");
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is Up and Running at Port: ${PORT}`);
})