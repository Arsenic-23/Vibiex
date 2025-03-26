// socket.js 🎧 - Handles WebSocket connection for real-time sync 🚀

import { io } from "socket.io-client";

// 🌐 WebSocket URL (Default to localhost for development)
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

// 🔗 Establish WebSocket connection
const socket = io(SOCKET_URL, {
  reconnectionAttempts: 5,
  transports: ["websocket"],
});

// 🎶 Emit /play event to WebSocket server
export const playSong = (songData) => {
  socket.emit("play", songData);
};

// ⏭️ Emit /skip event to skip the current song
export const skipSong = () => {
  socket.emit("skip");
};

// ⏹️ Emit /stop event to stop playback
export const stopPlayback = () => {
  socket.emit("stop");
};

// 🎧 Listen for queue updates
export const onQueueUpdate = (callback) => {
  socket.on("queueUpdate", (queue) => {
    callback(queue);
  });
};

// 🦋 Listen for playback status changes
export const onPlaybackUpdate = (callback) => {
  socket.on("playbackUpdate", (status) => {
    callback(status);
  });
};

// 🚀 Listen for user join/leave events
export const onUserUpdate = (callback) => {
  socket.on("userUpdate", (users) => {
    callback(users);
  });
};

// ❌ Disconnect WebSocket connection
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("🔌 WebSocket disconnected");
  }
};

// 🔄 Reconnect WebSocket
export const reconnectSocket = () => {
  if (!socket.connected) {
    socket.connect();
    console.log("🔗 WebSocket reconnected");
  }
};

// 🔥 Handle connection error
socket.on("connect_error", (err) => {
  console.error("❌ WebSocket connection error:", err);
});

export default socket;