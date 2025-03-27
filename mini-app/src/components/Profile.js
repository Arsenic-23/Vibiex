import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "../utils/WebSocketContext"; // Fixed import
import api from "../utils/api"; // Fixed import
import "../styles/profile.css";

const Profile = () => {
    const { user } = useContext(WebSocketContext); // Now correctly gets user data
    const [likedSongs, setLikedSongs] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        if (!user) return; // Ensure user data is available

        const fetchProfileData = async () => {
            try {
                const likedResponse = await api.get(`/user/${user.id}/liked-songs`);
                setLikedSongs(likedResponse.data);

                const statsResponse = await api.get(`/user/${user.id}/stats`);
                setStats(statsResponse.data);
            } catch (error) {
                console.error("Profile fetch error:", error);
            }
        };

        fetchProfileData();
    }, [user]);

    return (
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <div className="profile-info">
                <p><strong>Username:</strong> {user?.username || "Guest"}</p>
                <p><strong>Total Plays:</strong> {stats.totalPlays || 0}</p>
                <p><strong>Top Artist:</strong> {stats.topArtist || "N/A"}</p>
            </div>

            <h3 className="liked-songs-title">Liked Songs</h3>
            {likedSongs.length > 0 ? (
                <ul className="liked-songs-list">
                    {likedSongs.map((song, index) => (
                        <li key={index} className="liked-song">
                            <img src={song.thumbnail} alt={song.title} className="liked-thumbnail" />
                            <div className="liked-details">
                                <p className="liked-title">{song.title}</p>
                                <p className="liked-artist">{song.artist}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-liked-songs">No liked songs yet.</p>
            )}
        </div>
    );
};

export default Profile;