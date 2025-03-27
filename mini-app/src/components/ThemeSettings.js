import React, { useContext, useState } from "react";
import { WebSocketContext } from "../utils/websocket";
import { api } from "../utils/api";

function ThemeSettings() {
  const { theme, setTheme } = useContext(WebSocketContext);
  const [customColor, setCustomColor] = useState(theme.customColor || "#ffffff");

  const handleThemeChange = async (newTheme) => {
    setTheme(newTheme);
    await api.updateTheme({ theme: newTheme });
  };

  const handleCustomColorChange = async (event) => {
    const color = event.target.value;
    setCustomColor(color);
    await api.updateTheme({ theme: "custom", customColor: color });
  };

  return (
    <div className="theme-settings">
      <h2>Theme Customization</h2>
      <div className="theme-options">
        <button className={theme.mode === "light" ? "active" : ""} onClick={() => handleThemeChange("light")}>Light</button>
        <button className={theme.mode === "dark" ? "active" : ""} onClick={() => handleThemeChange("dark")}>Dark</button>
        <button className={theme.mode === "custom" ? "active" : ""} onClick={() => handleThemeChange("custom")}>Custom</button>
      </div>
      {theme.mode === "custom" && (
        <div className="custom-color-picker">
          <input type="color" value={customColor} onChange={handleCustomColorChange} />
        </div>
      )}
    </div>
  );
}

export default ThemeSettings;