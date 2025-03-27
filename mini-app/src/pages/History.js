
import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/history.css";

const History = () => {
  const { history, clearHistory } = useContext(WebSocketContext);

  return (
    <div className="history-container">
      <h1 className="history-title">Listening History</h1>

      {history.length === 0 ? (
        <p className="no-history">No history available.</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((song, index) => (
              <li key={index} className="history-item">
                <div className="song-info">
                  <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
                  <div>
                    <p className="song-title">{song.title}</p>
                    <p className="song-artist">{song.artist}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="clear-history-button" onClick={clearHistory}>
            Clear History
          </button>
        </>
      )}
    </div>
  );
};

export default History;