import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import Player from "../components/Player";
import Queue from "../components/Queue";
import "../styles/home.css"; // ✅ Ensure correct styling is applied

const Home = () => {
  const { currentSong, isPlaying } = useContext(WebSocketContext);

  return (
    <div className="home-container">
      <h1 className="vibiex-title">VIBIEX</h1> {/* ✅ Ensuring the bold and stylish title */}
      <Player />
      <Queue />
    </div>
  );
};

export default Home;