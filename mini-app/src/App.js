import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import Player from "./components/Player";
import ThemeSettings from "./components/ThemeSettings";
import WebSocketProvider from "./utils/websocket";

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <div className="app-container">
          <Player />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/theme" element={<ThemeSettings />} />
          </Routes>
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App;