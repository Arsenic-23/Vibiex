// socket.js 🎧 - Improved WebSocket handler with error fallback 🚀

import { io } from "socket.io-client";

// 🌐 WebSocket URL - Switch between localhost and production
const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://your-production-url.com"
    : "http://localhost:5000");

// 🔗 Establish WebSocket connection with error handling
let socket;

const connectSocket = () => {
  socket = io(SOCKET_URL, {
    reconnectionAttempts: 5,
    transports: ["websocket"],
  });

  socket.on("connect_error", (error) => {
    console.error("WebSocket Connection Error:", error);
    setTimeout(connectSocket, 3000); // Retry after 3 seconds
  });

  socket.on("disconnect", () => {
    console.warn("WebSocket disconnected, attempting to reconnect...");
    setTimeout(connectSocket, 3000); // Reconnect after 3 seconds
  });
};

// Initial WebSocket connection
connectSocket();

// 🎶 Emit /play event to WebSocket server
export const playSong = (songData) => {
  if (socket && socket.connected) {
    socket.emit("play", songData);
  } else {
    console.warn("WebSocket not connected, retrying...");
    connectSocket();
  }
};

// ⏭️ Emit /skip event to skip the current song
export const skipSong = () => {
  if (socket && socket.connected) {
    socket.emit("skip");
  }
};

// ⏹️ Emit /stop event to stop playback
export const stopPlayback = () => {
  if (socket && socket.connected) {
    socket.emit("stop");
  }
};

// 🎧 Listen for queue updates
export const onQueueUpdate = (callback) => {
  if (socket) {
    socket.on("queueUpdate", (queue) => {
      callback(queue);
    });
  }
};

// 🦋 Listen for playback status changes
export const onPlaybackUpdate = (callback) => {
  if (socket) {
    socket.on("playbackUpdate", (status) => {
      callback(status);
    });
  }
};

// ❗ Disconnect WebSocket safely
export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};