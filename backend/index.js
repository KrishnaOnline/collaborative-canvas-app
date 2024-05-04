const express = require("express");
const app = express();

const http = require("http");
const server = require("socket.io")(http);

app.get('/', (req, res) => {
    res.send("Collaborative White Board App");
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is Up and Running at Port: ${PORT}`);
})