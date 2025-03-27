import React, { useState, useEffect, useRef } from "react";
import "../styles/Player.css";

const WEBSOCKET_URL = "ws://localhost:5000"; // Update this if deployed

const Player = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [songInput, setSongInput] = useState(""); // New input field state
    const audioRef = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        // Connect to WebSocket
        socket.current = new WebSocket(WEBSOCKET_URL);

        socket.current.onopen = () => console.log("[✅] Connected to WebSocket");
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

        socket.current.onclose = () => console.log("[❌] WebSocket Disconnected");

        return () => socket.current.close();
    }, []);

    // Function to play a song from the mini app
    const handlePlayFromApp = () => {
        if (songInput.trim() !== "") {
            socket.current.send(JSON.stringify({ command: "play", query: songInput }));
            setSongInput(""); // Clear input after sending
        }
    };

    return (
        <div className="player-container">
            <h2>Mini App Music Player</h2>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter song name or URL"
                    value={songInput}
                    onChange={(e) => setSongInput(e.target.value)}
                />
                <button onClick={handlePlayFromApp}>Play</button>
            </div>

            {currentSong && (
                <div className="song-info">
                    <p>Now Playing: {currentSong.title}</p>
                    <audio ref={audioRef} controls />
                </div>
            )}
        </div>
    );
};

export default Player;