// Admin.js 👑 - Admin controls and room management 🚀

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import { getAuthToken } from "../utils/auth"; // Utility for getting token

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Admin = () => {
  const [queue, setQueue] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = getAuthToken();
        const [queueResponse, usersResponse] = await Promise.all([
          axios.get(`${API_URL}/queue`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/user/all`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setQueue(queueResponse.data);
        setUsers(usersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const removeSong = async (songId) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${API_URL}/queue/${songId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueue(queue.filter((song) => song.id !== songId));
      alert("Song removed successfully!");
    } catch (error) {
      console.error("Error removing song:", error);
    }
  };

  const kickUser = async (userId) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${API_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== userId));
      alert("User removed successfully!");
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  if (loading) return <div>Loading admin panel...</div>;

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <h2>Queue Management</h2>
      <ul>
        {queue.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist}
            <button onClick={() => removeSong(song.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Active Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => kickUser(user.id)}>Kick</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;