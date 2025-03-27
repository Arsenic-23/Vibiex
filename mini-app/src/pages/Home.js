import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../utils/websocket";
import Player from "../components/Player";
import Queue from "../components/Queue";
import "../styles/home.css";

const Home = () => {
  const { currentTrack, isPlaying, togglePlay, queue } = useContext(WebSocketContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentTrack) {
      setIsLoading(false);
    }
  }, [currentTrack]);

  return (
    <div className="home-container">
      <h1 className="home-title">Vibiex</h1>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <Player />
          <Queue queue={queue} />
        </>
      )}

      {!currentTrack && <p className="no-song">No song is currently playing.</p>}

      <button className="play-toggle-button" onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Home;