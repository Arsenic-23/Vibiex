import { useEffect, useState } from "react";
import io from "socket.io-client";
import Controls from "./Controls";
import "./Player.css";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
const socket = io(SOCKET_URL);

const Player = () => {
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        socket.on("PLAY", (data) => {
            console.log("🎵 Playing song:", data.song);
            setCurrentSong(data.song);
        });

        socket.on("PLAYFORCE", (data) => {
            console.log("🚀 Forcing playback of song:", data.song);
            setCurrentSong(data.song);
        });

        socket.on("SKIP", () => {
            console.log("⏭ Skipping song...");
            setCurrentSong(null);
        });

        socket.on("END", () => {
            console.log("⏹ Stopping playback...");
            setCurrentSong(null);
        });

        return () => {
            socket.off("PLAY");
            socket.off("PLAYFORCE");
            socket.off("SKIP");
            socket.off("END");
        };
    }, []);

    return (
        <div className="player-container">
            <h2>🎵 Vibie Music Player</h2>
            {currentSong ? (
                <audio src={currentSong} controls autoPlay />
            ) : (
                <p>No song playing</p>
            )}
            <Controls />
        </div>
    );
};

export default Player;