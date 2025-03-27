import React, { useEffect, useState, useContext } from "react";
import { WebSocketContext } from "../utils/websocket"; // Fixed import
import api from "../utils/api"; // Fixed import
import "../styles/stats.css";

const Stats = () => {
    const { user } = useContext(WebSocketContext);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get("/user/stats");
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) {
        return <div className="stats-container">Loading stats...</div>;
    }

    return (
        <div className="stats-container">
            <h2>User Statistics</h2>
            <div className="stats-section">
                <p><strong>Total Plays:</strong> {stats.totalPlays}</p>
                <p><strong>Total Songs Listened:</strong> {stats.totalSongs}</p>
                <p><strong>Total Artists Listened:</strong> {stats.totalArtists}</p>
                <p><strong>Total Hours Listened:</strong> {stats.totalHours}</p>
            </div>

            <div className="stats-section">
                <h3>Top Songs</h3>
                <ul>
                    {stats.topSongs.map((song, index) => (
                        <li key={index}>{song.name} - {song.playCount} plays</li>
                    ))}
                </ul>
            </div>

            <div className="stats-section">
                <h3>Top Artists</h3>
                <ul>
                    {stats.topArtists.map((artist, index) => (
                        <li key={index}>{artist.name} - {artist.playCount} plays</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Stats;