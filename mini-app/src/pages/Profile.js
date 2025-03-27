import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/profile.css"; // ✅ Ensuring correct styling

const Profile = () => {
  const { userProfile } = useContext(WebSocketContext); // ✅ Ensuring profile data is fetched

  if (!userProfile) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      
      <div className="profile-card">
        <img src={userProfile.avatar} alt="User Avatar" className="profile-avatar" />
        <h2>{userProfile.name}</h2>
        <p>{userProfile.email}</p>
      </div>

      <div className="profile-section">
        <h3>Favorites</h3>
        <ul>
          {userProfile.favorites.length > 0 ? (
            userProfile.favorites.map((song) => (
              <li key={song.id}>
                {song.title} - {song.artist}
              </li>
            ))
          ) : (
            <p>No favorites yet.</p>
          )}
        </ul>
      </div>

      <div className="profile-section">
        <h3>History</h3>
        <ul>
          {userProfile.history.length > 0 ? (
            userProfile.history.map((song) => (
              <li key={song.id}>
                {song.title} - {song.artist}
              </li>
            ))
          ) : (
            <p>No recent plays.</p>
          )}
        </ul>
      </div>

      <div className="profile-section">
        <h3>Settings</h3>
        <button className="theme-button">Customize Theme</button>
      </div>
    </div>
  );
};

export default Profile;