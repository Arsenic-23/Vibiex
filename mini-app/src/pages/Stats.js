import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/stats.css"; // ✅ Ensuring correct styling

const Stats = () => {
  const { userStats } = useContext(WebSocketContext); // ✅ Fetching user stats from WebSocketContext

  if (!userStats) {
    return <div className="loading">Loading stats...</div>;
  }

  return (
    <div className="stats-container">
      <h1 className="stats-title">Your Music Stats</h1>

      <div className="stats-section">
        <h3>Total Plays</h3>
        <p>{userStats.totalPlays}</p>
      </div>

      <div className="stats-section">
        <h3>Total Songs Listened</h3>
        <p>{userStats.totalSongs}</p>
      </div>

      <div className="stats-section">
        <h3>Total Artists Listened</h3>
        <p>{userStats.totalArtists}</p>
      </div>

      <div className="stats-section">
        <h3>Total Hours Listened</h3>
        <p>{userStats.totalHours} hrs</p>
      </div>

      <div className="stats-section">
        <h3>Top Songs</h3>
        <ul>
          {userStats.topSongs.length > 0 ? (
            userStats.topSongs.map((song, index) => (
              <li key={index}>
                {song.title} - {song.artist} ({song.playCount} plays)
              </li>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </ul>
      </div>

      <div className="stats-section">
        <h3>Top Artists</h3>
        <ul>
          {userStats.topArtists.length > 0 ? (
            userStats.topArtists.map((artist, index) => (
              <li key={index}>
                {artist.name} ({artist.playCount} plays)
              </li>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Stats;