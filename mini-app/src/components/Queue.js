// Queue.js 🎼 - Displays queue and manages song sync

import React from "react";
import "./Queue.css";

const Queue = ({ queue, setCurrentSong }) => {
  // 🎧 Play selected song from queue
  const handleSongClick = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="queue-container">
      <h3>🎶 Queue List</h3>
      {queue.length > 0 ? (
        <ul className="queue-list">
          {queue.map((song, index) => (
            <li
              key={index}
              className="queue-item"
              onClick={() => handleSongClick(song)}
            >
              {/* Display thumbnail if available */}
              {song.thumbnail && (
                <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
              )}
              <div className="song-info">
                <span>🎵 {song.title}</span>
                <span className="duration">⏱️ {song.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs in queue. Add some to vibe! 🦋</p>
      )}
    </div>
  );
};

export default Queue;