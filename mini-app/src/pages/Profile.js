// Profile.js 🎧 - User profile and listening stats 📊

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { getAuthToken } from "../utils/auth"; // Utility to get JWT token

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <div>Loading profile...</div>;
  if (!profileData) return <div>Error loading profile!</div>;

  return (
    <div className="profile-container">
      <h1>{profileData.username}'s Profile</h1>
      <p>Songs Played: {profileData.songsPlayed}</p>
      <p>Total Play Time: {profileData.totalPlayTime} mins</p>
      <p>Playlists Imported: {profileData.playlistsImported}</p>
    </div>
  );
};

export default Profile;