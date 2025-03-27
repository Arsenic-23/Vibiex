import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(WebSocketContext);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Favorite Songs</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites">No favorite songs yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((song, index) => (
            <li key={index} className="favorite-item">
              <div className="song-info">
                <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
                <div>
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFavorite(song.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;