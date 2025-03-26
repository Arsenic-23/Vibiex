// Profile.js 🎧 - User profile and listening stats 📊

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null); // 📊 User stats
  const [loading, setLoading] = useState(true);

  // 🕊️ Fetch user profile and stats on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div className="loading">🚀 Loading profile...</div>;
  }

  if (!profileData) {
    return <div className="error">💔 Unable to fetch profile details!</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">🦋 {profileData.username}'s Profile</h1>

      <div className="profile-stats">
        <p>💿 Songs Played: <strong>{profileData.songsPlayed}</strong></p>
        <p>⏱️ Total Play Time: <strong>{profileData.totalPlayTime} mins</strong></p>
        <p>📚 Playlists Imported: <strong>{profileData.playlistsImported}</strong></p>
      </div>

      <div className="recent-activity">
        <h2>💅 Recent Activity</h2>
        {profileData.recentActivity.length > 0 ? (
          <ul className="activity-list">
            {profileData.recentActivity.map((activity, index) => (
              <li key={index}>🎶 {activity}</li>
            ))}
          </ul>
        ) : (
          <p>No recent activity yet! 🕊️</p>
        )}
      </div>
    </div>
  );
};

export default Profile;