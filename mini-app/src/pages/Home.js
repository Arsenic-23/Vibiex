// Home.js 🏡 - Main app page with player and queue

import React, { useState, useEffect } from "react";
import Player from "../components/Player";
import Queue from "../components/Queue";
import Search from "../components/Search";
import "./Home.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Home = () => {
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get(`${API_URL}/queue`);
        setQueue(response.data.queue);
        if (response.data.queue.length > 0) {
          setCurrentSong(response.data.queue[0]);
        }
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    };
    fetchQueue();
  }, []);

  const addToQueue = (song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
    if (!currentSong) {
      setCurrentSong(song);
    }
  };

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
      <Search addToQueue={addToQueue} />
      {currentSong ? <Player song={currentSong} onSkip={skipSong} /> : <p>No song playing</p>}
      <Queue queue={queue} />
    </div>
  );
};

export default Home;