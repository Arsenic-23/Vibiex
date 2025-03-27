import React, { useState, useContext } from "react";
import { WebSocketContext } from "../utils/WebSocketContext"; // Fixed import
import api from "../utils/api"; // Fixed import
import "../styles/search.css";

const Search = () => {
    const { addToQueue } = useContext(WebSocketContext); // Fixed WebSocket function
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [source, setSource] = useState("YouTube"); // Added source selection

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const response = await api.get(`/search?query=${query}&source=${source.toLowerCase()}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
        }
    };

    const handleAddToQueue = (song) => {
        addToQueue(song);
    };

    return (
        <div className="search-container">
            <h2 className="search-title">Search</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for songs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            {/* Source selection dropdown */}
            <div className="source-selector">
                <label>Select Source:</label>
                <select value={source} onChange={(e) => setSource(e.target.value)}>
                    <option value="YouTube">YouTube</option>
                    <option value="Spotify">Spotify</option>
                </select>
            </div>

            <div className="search-results">
                {results.length > 0 ? (
                    <ul className="results-list">
                        {results.map((song, index) => (
                            <li key={index} className="search-item">
                                <img src={song.thumbnail} alt={song.title} className="search-thumbnail" />
                                <div className="search-details">
                                    <p className="search-title">{song.title}</p>
                                    <p className="search-artist">{song.artist}</p>
                                </div>
                                <button className="add-button" onClick={() => handleAddToQueue(song)}>+</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;