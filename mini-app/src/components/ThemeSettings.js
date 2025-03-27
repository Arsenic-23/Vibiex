import React, { useState, useEffect } from "react";
import { fetchUserTheme, updateUserTheme } from "../utils/api"; // ✅ Correct Import
import "./ThemeSettings.css";

const ThemeSettings = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    async function loadTheme() {
      try {
        const userTheme = await fetchUserTheme(); // ✅ Fetch user theme
        if (userTheme) {
          setTheme(userTheme);
          document.body.className = userTheme; // Apply theme globally
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    }
    loadTheme();
  }, []);

  const handleThemeChange = async (newTheme) => {
    try {
      await updateUserTheme(newTheme); // ✅ Update theme in backend
      setTheme(newTheme);
      document.body.className = newTheme;
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  return (
    <div className="theme-settings">
      <h2>Theme Settings</h2>
      <button className={theme === "light" ? "active" : ""} onClick={() => handleThemeChange("light")}>
        Light Mode
      </button>
      <button className={theme === "dark" ? "active" : ""} onClick={() => handleThemeChange("dark")}>
        Dark Mode
      </button>
      <button className={theme === "custom" ? "active" : ""} onClick={() => handleThemeChange("custom")}>
        Custom Theme
      </button>
    </div>
  );
};

export default ThemeSettings;