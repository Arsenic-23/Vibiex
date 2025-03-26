// Admin.js 👑 - Admin controls and room management 🚀

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [queue, setQueue] = useState([]); // 🎶 Queue of current songs
  const [users, setUsers] = useState([]); // 🕊️ List of active users
  const [loading, setLoading] = useState(true);

  // 🦋 Fetch queue and user data on load
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [queueResponse, usersResponse] = await Promise.all([
          axios.get("/api/queue"),
          axios.get("/api/user/all"),
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
      await axios.delete(`/api/queue/${songId}`);
      setQueue(queue.filter((song) => song.id !== songId));
      alert("🕊️ Song removed successfully!");
    } catch (error) {
      console.error("Error removing song:", error);
    }
  };

  const kickUser = async (userId) => {
    try {
      await axios.delete(`/api/user/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      alert("🚀 User kicked out successfully!");
    } catch (error) {
      console.error("Error kicking user:", error);
    }
  };

  if (loading) {
    return <div className="loading">🦋 Loading admin controls...</div>;
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">👑 Admin Panel</h1>

      <div className="queue-management">
        <h2>🎶 Manage Queue</h2>
        {queue.length > 0 ? (
          <ul className="queue-list">
            {queue.map((song) => (
              <li key={song.id}>
                {song.title} - {song.artist}
                <button onClick={() => removeSong(song.id)}>❌ Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No songs in the queue! 🕊️</p>
        )}
      </div>

      <div className="user-management">
        <h2>💅 Manage Users</h2>
        {users.length > 0 ? (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>
                {user.username}
                <button onClick={() => kickUser(user.id)}>🚫 Kick</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No active users! 🕊️</p>
        )}
      </div>
    </div>
  );
};

export default Admin;