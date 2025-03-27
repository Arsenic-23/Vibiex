import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";

function Profile() {
  const { userProfile } = useContext(WebSocketContext);

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="profile-info">
        <img src={userProfile.avatar} alt="User Avatar" className="profile-avatar" />
        <h3>{userProfile.username}</h3>
        <p>{userProfile.email}</p>
      </div>
      <div className="profile-stats">
        <h3>Statistics</h3>
        <ul>
          <li>Total Plays: {userProfile.stats.totalPlays}</li>
          <li>Total Songs Listened: {userProfile.stats.totalSongs}</li>
          <li>Total Artists Listened: {userProfile.stats.totalArtists}</li>
          <li>Total Hours Listened: {userProfile.stats.totalHours}</li>
        </ul>
      </div>
      <div className="profile-actions">
        <button className="btn">Edit Profile</button>
        <button className="btn logout">Log Out</button>
      </div>
    </div>
  );
}

export default Profile;