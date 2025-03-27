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
        const data = JSON.parse(message);

        if (data.command === "play") {
            console.log(`[🎵] Play request received for: ${data.query}`);

            // Fetch song details (assuming you have a function getSongUrl)
            const songUrl = await getSongUrl(data.query);
            if (songUrl) {
                const songData = { action: "play", song: { title: data.query, url: songUrl } };
                broadcast(songData); // Broadcast to all clients
            } else {
                ws.send(JSON.stringify({ action: "error", message: "Song not found" }));
            }
        }
    });

    ws.on("close", () => {
        console.log("[❌] WebSocket Disconnected");
        clients.delete(ws);
    });
});

/**
 * Dummy function to fetch a song URL.
 */
async function getSongUrl(query) {
    return `https://example.com/songs/${query.replace(/\s+/g, "_")}.mp3`;
}

server.listen(5000, () => console.log("[🚀] Server running on port 5000"));