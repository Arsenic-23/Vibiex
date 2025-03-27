import React, { useContext } from "react";
import Player from "../components/Player";
import Queue from "../components/Queue";
import { WebSocketContext } from "../utils/websocket";

function Home() {
  const { participants } = useContext(WebSocketContext);

  return (
    <div className="home-page">
      <header>
        <h1>VIBIEX</h1>
        <span className="participants">Listeners: {participants}</span>
      </header>
      <Player />
      <Queue />
    </div>
  );
}

export default Home;