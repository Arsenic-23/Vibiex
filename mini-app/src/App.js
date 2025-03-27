import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./utils/websocket"; // ✅ Ensuring WebSocketContext is available globally
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import ThemeSettings from "./components/ThemeSettings";

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/theme-settings" element={<ThemeSettings />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
}

export default App;