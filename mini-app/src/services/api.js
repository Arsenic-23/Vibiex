// api.js 🚀 - Handles API requests to the backend 🕊️

import axios from "axios";

// 🌐 Base URL for backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// 🎶 Fetch current queue
export const getQueue = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/queue`);
    return response.data;
  } catch (error) {
    console.error("Error fetching queue:", error);
    return [];
  }
};

// 🦋 Add song to queue
export const addSongToQueue = async (songData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/queue`, songData);
    return response.data;
  } catch (error) {
    console.error("Error adding song to queue:", error);
    return null;
  }
};

// ❌ Remove song from queue
export const removeSongFromQueue = async (songId) => {
  try {
    await axios.delete(`${API_BASE_URL}/queue/${songId}`);
    return true;
  } catch (error) {
    console.error("Error removing song:", error);
    return false;
  }
};

// 🕊️ Fetch all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// 🚫 Kick user from the room
export const kickUser = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/user/${userId}`);
    return true;
  } catch (error) {
    console.error("Error kicking user:", error);
    return false;
  }
};

// 🎧 Get song details
export const getSongDetails = async (songId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/song/${songId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching song details:", error);
    return null;
  }
};

// 💅 Update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    return null;
  }
};