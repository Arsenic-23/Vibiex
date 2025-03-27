import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import { FaPlay, FaPause, FaStepForward, FaHeart, FaRandom } from "react-icons/fa";

function Player() {
  const { currentSong, isPlaying, togglePlay, skipSong, likeSong, shuffleQueue } = useContext(WebSocketContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(currentSong?.liked || false);
  }, [currentSong]);

  const handleLike = () => {
    likeSong(currentSong.id);
    setLiked(!liked);
  };

  return (
    <div className="player">
      {currentSong ? (
        <>
          <div className="song-info">
            <img src={currentSong.thumbnail} alt={currentSong.title} className="song-thumbnail" />
            <div className="song-details">
              <h3>{currentSong.title}</h3>
              <p>{currentSong.artist}</p>
            </div>
          </div>
          <div className="controls">
            <FaRandom onClick={shuffleQueue} className="control-icon" />
            <FaHeart onClick={handleLike} className={liked ? "liked" : "control-icon"} />
            {isPlaying ? (
              <FaPause onClick={togglePlay} className="control-icon" />
            ) : (
              <FaPlay onClick={togglePlay} className="control-icon" />
            )}
            <FaStepForward onClick={skipSong} className="control-icon" />
          </div>
        </>
      ) : (
        <p>No song playing</p>
      )}
    </div>
  );
}

export default Player;