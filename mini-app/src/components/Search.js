// Search.js 🔍 - Song search and playlist import

import React, { useState } from "react";
import "./Search.css";
import axios from "axios";

const Search = ({ addToQueue }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // 🎧 Search for songs using backend API
  const handleSearch = async () => {
    if (query.trim() === "") return;
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // 🚀 Add selected song to queue
  const handleAddSong = (song) => {
    addToQueue(song);
    setQuery(""); // Clear input after adding
    setResults([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🎵 Search for a song or playlist..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>🔍 Search</button>

      {results.length > 0 && (
        <ul className="results-list">
          {results.map((song, index) => (
            <li key={index} className="result-item">
              <span>🎧 {song.title}</span>
              <button onClick={() => handleAddSong(song)}>➕ Add</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;