import React, { useContext, useState } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/settings.css";

const Settings = () => {
  const { userSettings, updateUserSettings } = useContext(WebSocketContext);
  const [settings, setSettings] = useState(userSettings || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUserSettings(settings);
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-section">
        <label>Volume</label>
        <input
          type="range"
          name="volume"
          min="0"
          max="100"
          value={settings.volume || 50}
          onChange={handleChange}
        />
      </div>

      <div className="settings-section">
        <label>Bass Boost</label>
        <select name="bass" value={settings.bass || "normal"} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="settings-section">
        <label>Theme</label>
        <select name="theme" value={settings.theme || "light"} onChange={handleChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <button className="save-button" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;