const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

let currentSong = null;
let queue = [];
let miniAppClient = null; // Stores WebSocket connection for mini-app

wss.on("connection", (ws, req) => {
    console.log("[✅] WebSocket Connected!");

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);
            console.log("[🔄] Received Command:", data);

            if (data.command === "play") {
                currentSong = data.query;
                if (miniAppClient) {
                    miniAppClient.send(JSON.stringify({ action: "play", song: currentSong }));
                }
            } else if (data.command === "pause" && miniAppClient) {
                miniAppClient.send(JSON.stringify({ action: "pause" }));
            } else if (data.command === "resume" && miniAppClient) {
                miniAppClient.send(JSON.stringify({ action: "resume" }));
            } else if (data.command === "skip" && miniAppClient) {
                miniAppClient.send(JSON.stringify({ action: "skip" }));
            } else if (data.command === "stop" && miniAppClient) {
                miniAppClient.send(JSON.stringify({ action: "stop" }));
                currentSong = null;
            }
        } catch (error) {
            console.error("[❌] WebSocket Message Error:", error);
        }
    });

    ws.on("close", () => {
        if (ws === miniAppClient) {
            console.log("[❌] Mini-App Disconnected");
            miniAppClient = null;
        }
    });

    if (!miniAppClient) {
        miniAppClient = ws;
    }
});

app.get("/api/current-song", (req, res) => {
    res.json({ song: currentSong, queue });
});

server.listen(5000, () => {
    console.log("[🚀] Server running on port 5000");
});