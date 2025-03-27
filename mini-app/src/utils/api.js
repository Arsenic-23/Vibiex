const API_BASE_URL = "https://your-backend-url.com/api"; // ✅ Replace with actual backend URL

// Fetch user theme settings
export async function getThemeSettings() {
  try {
    const response = await fetch(`${API_BASE_URL}/theme-settings`);
    if (!response.ok) throw new Error("Failed to fetch theme settings");
    return await response.json();
  } catch (error) {
    console.error("API Error (getThemeSettings):", error);
    return null;
  }
}

// Update user theme settings
export async function updateThemeSettings(themeData) {
  try {
    const response = await fetch(`${API_BASE_URL}/theme-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(themeData),
    });

    if (!response.ok) throw new Error("Failed to update theme settings");
    return await response.json();
  } catch (error) {
    console.error("API Error (updateThemeSettings):", error);
    return null;
  }
}