import express from 'express';
import { config } from 'dotenv';
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "https://chat-app-v35g.vercel.app",
        methods: ["GET", "POST"],
      }
});

let playerScore = [];

io.on("connection", (socket) => {

    socket.on("scores", (score) => {
        playerScore.push({...score, id: socket.id});

        socket.emit("playerScores", playerScore);

        setInterval(() => {
            socket.emit("playerScores", playerScore);
        }, 5000);
    });
});


app.get("/home", (req, res) => {
    res.json("prakash");
});



if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(__dirname, "./client/dist");
    app.use(express.static(staticPath));
    

    app.get("*", (req, res) => {
        res.sendFile(path.join(staticPath, "index.html"));
    });
}


httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});