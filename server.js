const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ✅ Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public"))); 

const botName = "ChatBot";

// Handle socket connection
io.on("connection", (socket) => {
    console.log("A user connected");

    // When a user sends a message
    socket.on("chatMessage", (msg) => {
        console.log("Received:", msg);
        io.emit("chatMessage", msg); // Broadcast message
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Serve the admin page
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
