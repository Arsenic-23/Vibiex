import React, { useState, useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import "../styles/search.css"; // ✅ Ensuring correct styling

const Search = () => {
  const { addToQueue } = useContext(WebSocketContext);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("YouTube"); // ✅ Default source selection
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    try {
      const response = await fetch(`/api/search?query=${query}&source=${source}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="source-selector">
        <label>
          <input
            type="radio"
            value="YouTube"
            checked={source === "YouTube"}
            onChange={() => setSource("YouTube")}
          />
          YouTube
        </label>
        <label>
          <input
            type="radio"
            value="Spotify"
            checked={source === "Spotify"}
            onChange={() => setSource("Spotify")}
          />
          Spotify
        </label>
      </div>

      <div className="search-results">
        {results.map((song) => (
          <div key={song.id} className="song-item">
            <img src={song.thumbnail} alt={song.title} />
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
            <button onClick={() => addToQueue(song)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;