// Player.js 🎵 - Music player with audio streaming and controls

import React, { useState, useEffect, useRef } from "react";
import "./Player.css";

const Player = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();
      playSong();
    }
  }, [currentSong]);

  // 🎧 Play or Pause Song
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 🔄 Update progress bar
  const updateProgress = () => {
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  // 🎶 Play song
  const playSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  // ⏩ Skip forward
  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  // ⏪ Skip backward
  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", updateProgress);
    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div className="player-container">
      {currentSong ? (
        <>
          <h3>🎵 Now Playing: {currentSong.title}</h3>
          <div className="controls">
            <button onClick={skipBackward}>⏪</button>
            <button onClick={togglePlayPause}>{isPlaying ? "⏸️" : "▶️"}</button>
            <button onClick={skipForward}>⏩</button>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </>
      ) : (
        <h3>No song selected. Add a song to the queue! 🚀</h3>
      )}
    </div>
  );
};

export default Player;