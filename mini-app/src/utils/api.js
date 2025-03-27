import axios from "axios";

const API_BASE_URL = "https://your-backend-url/api"; // Replace with actual backend URL

// Create an instance of axios for API requests
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to fetch the current song
export const getCurrentSong = async () => {
    try {
        const response = await apiClient.get("/current-song");
        return response.data;
    } catch (error) {
        console.error("Error fetching current song:", error);
        return null;
    }
};

// Function to add a song to the queue
export const addToQueue = async (songData) => {
    try {
        const response = await apiClient.post("/add-to-queue", songData);
        return response.data;
    } catch (error) {
        console.error("Error adding song to queue:", error);
        return null;
    }
};

// Function to fetch the song queue
export const getQueue = async () => {
    try {
        const response = await apiClient.get("/queue");
        return response.data;
    } catch (error) {
        console.error("Error fetching queue:", error);
        return [];
    }
};

// Function to skip the current song
export const skipSong = async () => {
    try {
        const response = await apiClient.post("/skip");
        return response.data;
    } catch (error) {
        console.error("Error skipping song:", error);
        return null;
    }
};

// Export the API client for custom requests
export default apiClient;