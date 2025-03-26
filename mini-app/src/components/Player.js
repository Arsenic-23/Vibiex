// Player.js 🎵 - Improved Music Player with error handling and sync

import React, { useState, useEffect, useRef } from "react";
import "./Player.css";
import { playSong, skipSong, stopPlayback } from "../services/socket";

const Player = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  // Load and play new song when currentSong changes
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();

      // Attempt to play the song with error handling
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  // 🎧 Play or Pause Song
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      stopPlayback(); // Notify server about pause
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          playSong({ url: currentSong.url });
        })
        .catch((error) => {
          console.error("Error while playing song:", error);
        });
    }
    setIsPlaying(!isPlaying);
  };

  // 🔄 Update progress bar
  const updateProgress = () => {
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  // 🎶 Play song again after skipping
  const playSongAgain = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  // ⏩ Skip forward 10 seconds
  const skipForward = () => {
    if (audioRef.current.duration - audioRef.current.currentTime > 10) {
      audioRef.current.currentTime += 10;
    } else {
      skipSong(); // Notify server to skip song
    }
  };

  // ⏪ Skip backward 10 seconds
  const skipBackward = () => {
    if (audioRef.current.currentTime > 10) {
      audioRef.current.currentTime -= 10;
    } else {
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="player-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={skipBackward}>⏪</button>
      <button onClick={skipForward}>⏩</button>
    </div>
  );
};

export default Player;