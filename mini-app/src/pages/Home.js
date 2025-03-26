// Home.js 🏡 - Main app page with player and queue

import React, { useState, useEffect } from "react";
import Player from "../components/Player";
import Queue from "../components/Queue";
import Search from "../components/Search";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [queue, setQueue] = useState([]); // 🎶 Song queue
  const [currentSong, setCurrentSong] = useState(null); // 🎧 Currently playing song

  // 🚀 Fetch initial queue from backend
  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get("/api/queue");
        setQueue(response.data.queue);
        if (response.data.queue.length > 0) {
          setCurrentSong(response.data.queue[0]); // Play first song by default
        }
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    };
    fetchQueue();
  }, []);

  // 🎵 Add song to the queue
  const addToQueue = (song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
    if (!currentSong) {
      setCurrentSong(song);
    }
  };

  // ⏭️ Skip to next song in queue
  const skipSong = () => {
    if (queue.length > 1) {
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      setCurrentSong(newQueue[0]);
    } else {
      setQueue([]);
      setCurrentSong(null);
    }
  };

  return (
    <div className="home-container">
      <h1 className="app-title">🎶 Vibie Mini App 🚀</h1>

      <div className="search-section">
        <Search addToQueue={addToQueue} />
      </div>

      <div className="player-section">
        {currentSong ? (
          <Player song={currentSong} onSkip={skipSong} />
        ) : (
          <p className="no-song">🕊️ No song currently playing</p>
        )}
      </div>

      <div className="queue-section">
        <Queue queue={queue} />
      </div>
    </div>
  );
};

export default Home;