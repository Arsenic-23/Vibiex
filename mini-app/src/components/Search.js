import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "../utils/WebSocketContext"; // Fixed import
import api from "../utils/api"; // Fixed import
import "../styles/search.css";

const Search = () => {
    const { sendMessage } = useContext(WebSocketContext);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [source, setSource] = useState("YouTube"); // Default source

    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            try {
                const response = await api.get(`/search?query=${query}&source=${source}`);
                setResults(response.data);
            } catch (error) {
                console.error("Search error:", error);
            }
        };

        fetchResults();
    }, [query, source]);

    const addToQueue = (song) => {
        sendMessage({ type: "ADD_TO_QUEUE", song });
    };

    return (
        <div className="search-container">
            <h2 className="search-title">Search Songs</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search for a song..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="source-selector">
                <button className={`source-btn ${source === "YouTube" ? "active" : ""}`} onClick={() => setSource("YouTube")}>
                    YouTube
                </button>
                <button className={`source-btn ${source === "Spotify" ? "active" : ""}`} onClick={() => setSource("Spotify")}>
                    Spotify
                </button>
            </div>
            {results.length > 0 ? (
                <ul className="search-results">
                    {results.map((song, index) => (
                        <li key={index} className="search-item">
                            <img src={song.thumbnail} alt={song.title} className="search-thumbnail" />
                            <div className="search-details">
                                <p className="search-song-title">{song.title}</p>
                                <p className="search-song-artist">{song.artist}</p>
                            </div>
                            <button className="add-btn" onClick={() => addToQueue(song)}>Add</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-results">No results found</p>
            )}
        </div>
    );
};

export default Search;