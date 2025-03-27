const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:5000";

let socket = null;

export const connectWebSocket = (onMessage) => {
  if (!socket) {
    socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      if (onMessage) {
        onMessage(JSON.parse(event.data));
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected, attempting to reconnect...");
      setTimeout(() => connectWebSocket(onMessage), 3000);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  }
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};