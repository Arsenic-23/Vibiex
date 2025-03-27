import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket"; // ✅ Ensuring correct WebSocket usage
import "../styles/themeSettings.css"; // ✅ Styling import

const ThemeSettings = () => {
  const { theme, setTheme } = useContext(WebSocketContext); // ✅ Accessing theme state from WebSocketContext

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // ✅ Updating theme in context
  };

  return (
    <div className="theme-settings">
      <h2 className="theme-title">Theme Settings</h2>

      <div className="theme-options">
        <button
          className={`theme-button ${theme === "light" ? "active" : ""}`}
          onClick={() => handleThemeChange("light")}
        >
          Light Mode
        </button>

        <button
          className={`theme-button ${theme === "dark" ? "active" : ""}`}
          onClick={() => handleThemeChange("dark")}
        >
          Dark Mode
        </button>

        <button
          className={`theme-button ${theme === "custom" ? "active" : ""}`}
          onClick={() => handleThemeChange("custom")}
        >
          Custom Color
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings;