import { io } from "socket.io-client";
import { getAuthToken } from "../utils/auth"; // Utility to get token

const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

let socket;

const connectSocket = () => {
  if (!socket) {
    const token = getAuthToken(); // Get authentication token
    socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      timeout: 10000,
      auth: { token }, // 🔒 Send token in connection
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

export { connectSocket };