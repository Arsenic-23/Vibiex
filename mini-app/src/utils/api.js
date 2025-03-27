import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./utils/websocket"; // ✅ WebSocket Context Fixed
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import History from "./pages/History";

function App() {
  return (
    <WebSocketProvider> {/* ✅ Wrapping the App with WebSocket Context */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
}

export default App;