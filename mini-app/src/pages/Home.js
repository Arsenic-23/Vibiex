import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import Player from "../components/Player";
import Queue from "../components/Queue";
import "../styles/home.css";

const Home = () => {
  const { currentSong, isPlaying } = useContext(WebSocketContext);

  return (
    <div className="home-container">
      <h1 className="home-title">Now Playing</h1>

      {currentSong ? (
        <Player song={currentSong} isPlaying={isPlaying} />
      ) : (
        <p className="no-song">No song is currently playing.</p>
      )}

      <Queue />
    </div>
  );
};

export default Home;