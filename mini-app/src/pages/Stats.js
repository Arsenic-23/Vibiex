
import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/stats.css";

const Stats = () => {
  const { userStats } = useContext(WebSocketContext);

  if (!userStats) {
    return <div className="loading">Loading stats...</div>;
  }

  return (
    <div className="stats-container">
      <h1 className="stats-title">Your Listening Stats</h1>

      <div className="stats-section">
        <h3>Overall Stats</h3>
        <p><strong>Total Plays:</strong> {userStats.totalPlays}</p>
        <p><strong>Total Songs Listened:</strong> {userStats.totalSongs}</p>
        <p><strong>Total Artists Listened:</strong> {userStats.totalArtists}</p>
        <p><strong>Total Hours Listened:</strong> {userStats.totalHours}</p>
      </div>

      <div className="stats-section">
        <h3>Top Songs</h3>
        {userStats.topSongs.length > 0 ? (
          <ul className="stats-list">
            {userStats.topSongs.map((song, index) => (
              <li key={index} className="stats-list-item">
                <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
                <div className="song-info">
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                  <p className="song-plays"><strong>Plays:</strong> {song.plays}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No top songs yet.</p>
        )}
      </div>

      <div className="stats-section">
        <h3>Top Artists</h3>
        {userStats.topArtists.length > 0 ? (
          <ul className="stats-list">
            {userStats.topArtists.map((artist, index) => (
              <li key={index} className="stats-list-item">
                <img src={artist.image} alt={artist.name} className="artist-thumbnail" />
                <div className="artist-info">
                  <p className="artist-name">{artist.name}</p>
                  <p className="artist-plays"><strong>Plays:</strong> {artist.plays}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No top artists yet.</p>
        )}
      </div>
    </div>
  );
};

export default Stats;