import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/profile.css";

const Profile = () => {
  const { userProfile } = useContext(WebSocketContext);

  if (!userProfile) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>

      <div className="profile-info">
        <img src={userProfile.avatar} alt="Profile" className="profile-avatar" />
        <h2 className="profile-username">{userProfile.username}</h2>
      </div>

      <div className="profile-stats">
        <h3>Stats</h3>
        <p><strong>Total Plays:</strong> {userProfile.stats.totalPlays}</p>
        <p><strong>Total Songs Listened:</strong> {userProfile.stats.totalSongs}</p>
        <p><strong>Total Artists Listened:</strong> {userProfile.stats.totalArtists}</p>
        <p><strong>Total Hours Listened:</strong> {userProfile.stats.totalHours}</p>
      </div>

      <div className="profile-section">
        <h3>Liked Songs</h3>
        {userProfile.likedSongs.length > 0 ? (
          <ul className="profile-list">
            {userProfile.likedSongs.map((song, index) => (
              <li key={index} className="profile-list-item">
                <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
                <div className="song-info">
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No liked songs yet.</p>
        )}
      </div>

      <div className="profile-section">
        <h3>Listening History</h3>
        {userProfile.history.length > 0 ? (
          <ul className="profile-list">
            {userProfile.history.map((song, index) => (
              <li key={index} className="profile-list-item">
                <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
                <div className="song-info">
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No listening history.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;