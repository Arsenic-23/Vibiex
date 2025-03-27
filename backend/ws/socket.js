const { addToQueue, removeFromQueue, getQueue } = require("./utils/queue");

function socketServer(server) {
    const io = require("socket.io")(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log("[✅] Client connected:", socket.id);

        // Send the current queue to the newly connected client
        socket.emit("QUEUE_UPDATE", getQueue());

        // Handle playback commands from the bot or mini-app
        socket.on("COMMAND", async (data) => {
            switch (data.action) {
                case "PLAY":
                    console.log(`🎵 Playing song: ${data.song.title}`);
                    addToQueue(data.song);
                    io.emit("PLAY", { song: data.song });
                    io.emit("QUEUE_UPDATE", getQueue()); // Send updated queue
                    break;
                case "PLAYFORCE":
                    console.log(`🚀 Forcing song: ${data.song.title}`);
                    addToQueue(data.song);
                    io.emit("PLAYFORCE", { song: data.song });
                    io.emit("QUEUE_UPDATE", getQueue());
                    break;
                case "SKIP":
                    console.log("⏭ Skipping song...");
                    removeFromQueue();
                    io.emit("SKIP");
                    io.emit("QUEUE_UPDATE", getQueue());
                    break;
                case "END":
                    console.log("⏹ Stopping playback...");
                    io.emit("END");
                    break;
            }
        });

        socket.on("disconnect", () => {
            console.log("[❌] Client disconnected:", socket.id);
        });
    });
}

module.exports = socketServer;