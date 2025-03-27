
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const mongoose = require("mongoose");
const Queue = require("./models/Queue"); // Import Queue model

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

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

/**
 * Fetches the queue from the database.
 */
async function getQueue(roomId) {
    const queue = await Queue.findOne({ roomId });
    return queue || new Queue({ roomId, tracks: [] });
}

/**
 * WebSocket Connection Handling.
 */
wss.on("connection", (ws) => {
    console.log("[✅] WebSocket Connected!");
    clients.add(ws);

    ws.on("message", async (message) => {
        try {
            const data = JSON.parse(message);
            console.log("[🔄] Received Command:", data);

            if (!data.roomId) return; // Ensure roomId is provided
            const queue = await getQueue(data.roomId);

            switch (data.command) {
                case "play":
                    if (data.query) {
                        queue.tracks.push(data.query);
                        if (!queue.currentTrack) {
                            queue.currentTrack = 0;
                        }
                        await queue.save();
                        broadcast({ action: "play", song: queue.tracks[queue.currentTrack] });
                    }
                    break;

                case "pause":
                    queue.isPlaying = false;
                    await queue.save();
                    broadcast({ action: "pause" });
                    break;

                case "resume":
                    queue.isPlaying = true;
                    await queue.save();
                    broadcast({ action: "resume" });
                    break;

                case "skip":
                    if (queue.tracks.length > 1) {
                        queue.tracks.shift();
                        queue.currentTrack = 0;
                        await queue.save();
                        broadcast({ action: "play", song: queue.tracks[0] });
                    } else {
                        queue.tracks = [];
                        queue.currentTrack = 0;
                        queue.isPlaying = false;
                        await queue.save();
                        broadcast({ action: "stop" });
                    }
                    break;

                case "stop":
                    queue.tracks = [];
                    queue.currentTrack = 0;
                    queue.isPlaying = false;
                    await queue.save();
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

/**
 * API Endpoint to Get Current Song.
 */
app.get("/api/:roomId/current-song", async (req, res) => {
    const queue = await getQueue(req.params.roomId);
    res.json({ song: queue.tracks[queue.currentTrack] || null, queue: queue.tracks });
});

/**
 * MongoDB Connection.
 */
mongoose.connect("mongodb://localhost:27017/vibie", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("[✅] MongoDB Connected!");
}).catch(err => console.error("[❌] MongoDB Connection Error:", err));

server.listen(5000, () => {
    console.log("[🚀] Server running on port 5000");
});