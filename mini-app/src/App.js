import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./utils/websocket"; // ✅ Ensuring WebSocketContext is available globally
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings"; // ✅ Added missing import for Settings page
import Favorites from "./pages/Favorites"; // ✅ Added missing import for Favorites page
import History from "./pages/History"; // ✅ Added missing import for History page
import ThemeSettings from "./components/ThemeSettings";
import Queue from "./components/Queue"; // ✅ Ensure Queue is properly included
import NavigationBar from "./components/NavigationBar"; // ✅ Ensure bottom nav is included

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/theme-settings" element={<ThemeSettings />} />
            <Route path="/queue" element={<Queue />} />
          </Routes>
          <NavigationBar /> {/* ✅ Ensuring bottom navigation is always present */}
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App;