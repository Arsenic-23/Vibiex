import { useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
const socket = io(SOCKET_URL);

const Player = () => {
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        socket.on("PLAY", (data) => {
            console.log("Playing song:", data.song);
            setCurrentSong(data.song);
        });

        return () => {
            socket.off("PLAY");
        };
    }, []);

    return (
        <div>
            <h3>Now Playing:</h3>
            {currentSong ? <audio src={currentSong} controls autoPlay /> : <p>No song playing</p>}
        </div>
    );
};

export default Player;