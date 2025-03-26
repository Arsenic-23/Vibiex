import React, { useState, useEffect, useRef } from "react";
import "./Player.css";
import { playSong, skipSong, stopPlayback } from "../services/socket";
import { getAuthToken } from "../utils/auth"; // Utility to get token

const Player = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    const token = getAuthToken(); // Get authentication token

    if (isPlaying) {
      audioRef.current.pause();
      stopPlayback(token); // Send token with WebSocket event
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          playSong({ url: currentSong.url, token }); // Send token
        })
        .catch((error) => console.error("Error while playing song:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    const token = getAuthToken();
    if (audioRef.current.duration - audioRef.current.currentTime > 10) {
      audioRef.current.currentTime += 10;
    } else {
      skipSong(token); // Send token for authentication
    }
  };

  return (
    <div className="player-container">
      <h3>Now Playing</h3>
      {currentSong ? (
        <>
          <p>{currentSong.title}</p>
          <button onClick={togglePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={skipForward}>Skip</button>
        </>
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
};

export default Player;