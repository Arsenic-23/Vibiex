import React, { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Search = ({ addToQueue }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Debounced search function
  const fetchSongs = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) return;
      try {
        const response = await axios.get(`${API_URL}/search?query=${searchQuery}`);
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 500),
    []
  );

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    fetchSongs(newQuery);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for songs..."
      />
      <ul>
        {results.map((song) => (
          <li key={song.id} onClick={() => addToQueue(song)}>
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;