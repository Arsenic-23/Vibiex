const { Server } = require('socket.io');

let io;

const initializeWebSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',  // Allow all origins (modify for security if needed)
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('joinStream', (data) => {
            socket.join('music-stream');
            io.to('music-stream').emit('userJoined', data);
            console.log(`${data.username} joined the stream.`);
        });

        socket.on('playSong', (songData) => {
            io.to('music-stream').emit('playSong', songData);
            console.log(`Playing song: ${songData.title}`);
        });

        socket.on('skipSong', () => {
            io.to('music-stream').emit('skipSong');
            console.log('Song skipped.');
        });

        socket.on('addToQueue', (song) => {
            io.to('music-stream').emit('updateQueue', song);
            console.log(`Song added to queue: ${song.title}`);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

module.exports = { initializeWebSocket, getIO };