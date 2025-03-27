import React, { createContext, useContext, useEffect, useState } from "react";

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:5000";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected, attempting to reconnect...");
      setTimeout(() => setSocket(new WebSocket(WEBSOCKET_URL)), 3000);
    };
    ws.onerror = (error) => console.error("WebSocket Error:", error);

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);