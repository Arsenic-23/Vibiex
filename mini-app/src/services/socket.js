import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://your-production-url.com"
    : "http://localhost:5000");

let socket;

const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket Connection Error:", err.message);
    });

    socket.on("disconnect", () => {
      console.warn("Socket disconnected! Attempting to reconnect...");
      setTimeout(() => {
        connectSocket();
      }, 3000);
    });
  }
};

const playSong = (song) => socket.emit("play", song);
const skipSong = () => socket.emit("skip");
const stopPlayback = () => socket.emit("stop");

export { connectSocket, playSong, skipSong, stopPlayback };