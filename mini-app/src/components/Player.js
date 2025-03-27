import React, { useState, useEffect, useRef } from "react";
import "../styles/Player.css"; // Ensure this file exists

const WEBSOCKET_URL = "ws://localhost:5000"; // Update if backend is hosted elsewhere

const Player = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const audioRef = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        // Connect to WebSocket
        socket.current = new WebSocket(WEBSOCKET_URL);

        socket.current.onopen = () => {
            console.log("[✅] Connected to WebSocket");
        };

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("[🔄] WebSocket Message:", data);

            if (data.action === "play") {
                setCurrentSong(data.song);
                if (audioRef.current) {
                    audioRef.current.src = data.song.url;
                    audioRef.current.play();
                }
            } else if (data.action === "pause" && audioRef.current) {
                audioRef.current.pause();
            } else if (data.action === "resume" && audioRef.current) {
                audioRef.current.play();
            } else if (data.action === "skip") {
                setCurrentSong(null);
            } else if (data.action === "stop") {
                setCurrentSong(null);
                if (audioRef.current) audioRef.current.pause();
            }
        };

        socket.current.onclose = () => {
            console.log("[❌] WebSocket Disconnected");
        };

        return () => {
            socket.current.close();
        };
    }, []);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
            socket.current.send(JSON.stringify({ command: "resume" }));
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            socket.current.send(JSON.stringify({ command: "pause" }));
        }
    };

    const handleSkip = () => {
        socket.current.send(JSON.stringify({ command: "skip" }));
    };

    return (
        <div className="player-container">
            {currentSong ? (
                <>
                    <img 
                        src={currentSong.thumbnail || "default-thumbnail.jpg"} 
                        alt="Song Thumbnail" 
                        className="song-thumbnail"
                    />
                    <h2>🎵 Now Playing: {currentSong.title}</h2>
                    <p>⏱️ Duration: {currentSong.duration} sec</p>
                </>
            ) : (
                <h2>No song playing</h2>
            )}
            
            <audio ref={audioRef} controls style={{ width: "100%" }} />
            
            <div className="controls">
                <button onClick={handlePlay}>▶ Play</button>
                <button onClick={handlePause}>⏸ Pause</button>
                <button onClick={handleSkip}>⏭ Skip</button>
            </div>
        </div>
    );
};

export default Player;