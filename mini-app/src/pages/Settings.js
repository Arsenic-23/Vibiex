
import React, { useContext, useState } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/settings.css";

const Settings = () => {
  const { volume, setVolume, theme, setTheme } = useContext(WebSocketContext);
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="setting-group">
        <label>Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        <span>{Math.round(volume * 100)}%</span>
      </div>

      <div className="setting-group">
        <label>Theme</label>
        <div className="theme-options">
          <button
            className={`theme-button ${selectedTheme === "light" ? "active" : ""}`}
            onClick={() => handleThemeChange("light")}
          >
            Light
          </button>
          <button
            className={`theme-button ${selectedTheme === "dark" ? "active" : ""}`}
            onClick={() => handleThemeChange("dark")}
          >
            Dark
          </button>
          <button
            className={`theme-button ${selectedTheme === "custom" ? "active" : ""}`}
            onClick={() => handleThemeChange("custom")}
          >
            Custom
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;