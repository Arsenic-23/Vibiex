import React, { useState, useContext } from "react";
import { WebSocketContext } from "../utils/websocket"; // Fixed import
import api from "../utils/api"; // Fixed import
import "../styles/themeSettings.css";

const ThemeSettings = () => {
    const { theme, setTheme } = useContext(WebSocketContext);
    const [selectedTheme, setSelectedTheme] = useState(theme);

    const handleThemeChange = async (newTheme) => {
        setSelectedTheme(newTheme);
        setTheme(newTheme);
        
        try {
            await api.post("/user/theme", { theme: newTheme });
        } catch (error) {
            console.error("Error saving theme:", error);
        }
    };

    return (
        <div className="theme-settings-container">
            <h2>Theme Settings</h2>
            <div className="theme-options">
                <button 
                    className={selectedTheme === "light" ? "active" : ""}
                    onClick={() => handleThemeChange("light")}
                >
                    Light Theme
                </button>
                <button 
                    className={selectedTheme === "dark" ? "active" : ""}
                    onClick={() => handleThemeChange("dark")}
                >
                    Dark Theme
                </button>
                <button 
                    className={selectedTheme === "custom" ? "active" : ""}
                    onClick={() => handleThemeChange("custom")}
                >
                    Custom Theme
                </button>
            </div>
        </div>
    );
};

export default ThemeSettings;