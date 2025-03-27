import { io } from "socket.io-client";
import { getAuthToken } from "../utils/auth"; // Utility to get token

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
let socket;

const connectSocket = () => {
  if (!socket) {
    const token = getAuthToken(); // Get authentication token
    socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      timeout: 10000,
      auth: { token }, // 🔒 Send token in connection
    });

    socket.on("connect", () => console.log("[✅] WebSocket Connected!"));
    
    socket.on("connect_error", (err) => {
      console.error("[⚠] WebSocket Connection Error:", err.message);
    });

    socket.on("disconnect", () => {
      console.warn("[❌] WebSocket Disconnected! Reconnecting in 3s...");
      setTimeout(() => {
        connectSocket();
      }, 3000);
    });

    // Handle incoming messages
    socket.on("message", (data) => {
      console.log("[📩] WebSocket Message:", data);
    });
  }
};

// Export socket for use in other files
export { connectSocket, socket };