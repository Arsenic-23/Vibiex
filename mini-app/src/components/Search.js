import React, { useState, useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import { FaSearch, FaPlus } from "react-icons/fa";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [source, setSource] = useState("youtube"); // Default source is YouTube
  const { searchSongs, addToQueue } = useContext(WebSocketContext);

  const handleSearch = async () => {
    if (query.trim() !== "") {
      const data = await searchSongs(query, source);
      setResults(data);
    }
  };

  return (
    <div className="search">
      <h2>Search Songs</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      <div className="search-filters">
        <button 
          className={source === "youtube" ? "active" : ""}
          onClick={() => setSource("youtube")}
        >
          YouTube
        </button>
        <button 
          className={source === "spotify" ? "active" : ""}
          onClick={() => setSource("spotify")}
        >
          Spotify
        </button>
      </div>
      <div className="search-results">
        {results.length > 0 ? (
          <ul>
            {results.map((song, index) => (
              <li key={index} className="search-item">
                <img src={song.thumbnail} alt={song.title} className="search-thumbnail" />
                <div className="search-details">
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
                <button onClick={() => addToQueue(song)}>
                  <FaPlus />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
