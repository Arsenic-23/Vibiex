function socketServer(server) {
    const io = require('socket.io')(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Handle playback commands from the bot or mini-app
        socket.on('COMMAND', async (data) => {
            switch (data.action) {
                case "PLAY":
                    console.log(`🎵 Playing song: ${data.song}`);
                    io.emit('PLAY', { song: data.song });
                    break;
                case "PLAYFORCE":
                    console.log(`🚀 Forcing song: ${data.song}`);
                    io.emit('PLAYFORCE', { song: data.song });
                    break;
                case "SKIP":
                    console.log("⏭ Skipping song...");
                    io.emit('SKIP');
                    break;
                case "END":
                    console.log("⏹ Stopping playback...");
                    io.emit('END');
                    break;
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

module.exports = socketServer;