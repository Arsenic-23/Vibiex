import React, { useContext, useState, useEffect } from "react";
import { WebSocketContext } from "../utils/WebSocketContext"; // Ensure correct context import
import { getCurrentSong, skipSong } from "../utils/api"; // Correct API imports
import "../styles/player.css";

const Player = () => {
    const { sendMessage, currentSong, setCurrentSong } = useContext(WebSocketContext);
    const [isPlaying, setIsPlaying] = useState(false);

    // Fetch the currently playing song
    useEffect(() => {
        const fetchCurrentSong = async () => {
            const song = await getCurrentSong();
            if (song) setCurrentSong(song);
        };

        fetchCurrentSong();
    }, [setCurrentSong]);

    // Handle play/pause toggle
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        sendMessage({ type: "TOGGLE_PLAY", isPlaying: !isPlaying });
    };

    // Handle skipping the song
    const handleSkip = async () => {
        await skipSong();
        sendMessage({ type: "SKIP_SONG" });
    };

    return (
        <div className="player-container">
            {currentSong ? (
                <>
                    <img src={currentSong.thumbnail} alt={currentSong.title} className="song-thumbnail" />
                    <h2 className="song-title">{currentSong.title}</h2>
                    <p className="song-artist">{currentSong.artist}</p>
                    <div className="controls">
                        <button onClick={togglePlayPause} className="play-pause-btn">
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                        <button onClick={handleSkip} className="skip-btn">Skip</button>
                    </div>
                </>
            ) : (
                <p className="no-song">No song playing</p>
            )}
        </div>
    );
};

export default Player;