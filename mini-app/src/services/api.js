// api.js 🚀 - Handles API requests to the backend 🕊️

import axios from "axios";

// 🌐 Base URL for backend API (Fix: Dynamic fallback instead of hardcoded localhost)
const API_BASE_URL =
  process.env.REACT_APP_API_URL || `${window.location.origin}/api`;

// 🎶 Fetch current queue
export const getQueue = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/queue`);
    return response.data;
  } catch (error) {
    return { error: error.response?.data || "Failed to fetch queue" };
  }
};

// 🦋 Add song to queue
export const addSongToQueue = async (song) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/queue`, { song });
    return response.data;
  } catch (error) {
    return { error: error.response?.data || "Failed to add song" };
  }
};

// ⏭ Skip current song
export const skipSong = async () => {
  try {
    await axios.post(`${API_BASE_URL}/queue/skip`);
    return { success: true };
  } catch (error) {
    return { error: error.response?.data || "Failed to skip song" };
  }
};