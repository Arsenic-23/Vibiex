const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

let queue = []; // Queue of songs
let currentSong = null;
let clients = new Set(); // Store connected mini-app clients

/**
 * Broadcast a message to all connected mini-apps.
 */
function broadcast(data) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

wss.on("connection", (ws) => {
    console.log("[✅] WebSocket Connected!");
    clients.add(ws);

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);
            console.log("[🔄] Received Command:", data);

            switch (data.command) {
                case "play":
                    if (data.query) {
                        queue.push(data.query);
                        if (!currentSong) {
                            currentSong = queue.shift();
                        }
                        broadcast({ action: "play", song: currentSong });
                    }
                    break;

                case "pause":
                    broadcast({ action: "pause" });
                    break;

                case "resume":
                    broadcast({ action: "resume" });
                    break;

                case "skip":
                    if (queue.length > 0) {
                        currentSong = queue.shift();
                        broadcast({ action: "play", song: currentSong });
                    } else {
                        currentSong = null;
                        broadcast({ action: "stop" });
                    }
                    break;

                case "stop":
                    queue = [];
                    currentSong = null;
                    broadcast({ action: "stop" });
                    break;
            }
        } catch (error) {
            console.error("[❌] WebSocket Message Error:", error);
        }
    });

    ws.on("close", () => {
        console.log("[❌] Mini-App Disconnected");
        clients.delete(ws);
    });
});

app.get("/api/current-song", (req, res) => {
    res.json({ song: currentSong, queue });
});

server.listen(5000, () => {
    console.log("[🚀] Server running on port 5000");
});