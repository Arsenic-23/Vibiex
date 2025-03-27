import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";

function Stats() {
  const { userProfile } = useContext(WebSocketContext);
  const stats = userProfile.stats;

  return (
    <div className="stats">
      <h2>User Statistics</h2>
      <div className="stats-container">
        <div className="stat-item">
          <h3>Total Plays</h3>
          <p>{stats.totalPlays}</p>
        </div>
        <div className="stat-item">
          <h3>Total Songs Listened</h3>
          <p>{stats.totalSongs}</p>
        </div>
        <div className="stat-item">
          <h3>Total Artists Listened</h3>
          <p>{stats.totalArtists}</p>
        </div>
        <div className="stat-item">
          <h3>Total Hours Listened</h3>
          <p>{stats.totalHours}</p>
        </div>
        <div className="stat-item">
          <h3>Top Songs</h3>
          <ul>
            {stats.topSongs.map((song, index) => (
              <li key={index}>{song.title} - {song.playCount} plays</li>
            ))}
          </ul>
        </div>
        <div className="stat-item">
          <h3>Top Artists</h3>
          <ul>
            {stats.topArtists.map((artist, index) => (
              <li key={index}>{artist.name} - {artist.playCount} plays</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Stats;