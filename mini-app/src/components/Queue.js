import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../utils/WebSocketContext"; // Fixed import
import "../styles/queue.css";

const Queue = () => {
    const { queue, setQueue, sendMessage } = useContext(WebSocketContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (queue) setLoading(false);
    }, [queue]);

    // Handle removing a song from the queue
    const removeSong = (index) => {
        const updatedQueue = queue.filter((_, i) => i !== index);
        setQueue(updatedQueue);
        sendMessage({ type: "UPDATE_QUEUE", queue: updatedQueue });
    };

    return (
        <div className="queue-container">
            <h2 className="queue-title">Current Queue</h2>
            {loading ? (
                <p className="loading">Loading...</p>
            ) : queue.length > 0 ? (
                <ul className="queue-list">
                    {queue.map((song, index) => (
                        <li key={index} className="queue-item">
                            <img src={song.thumbnail} alt={song.title} className="queue-thumbnail" />
                            <div className="queue-details">
                                <p className="queue-song-title">{song.title}</p>
                                <p className="queue-song-artist">{song.artist}</p>
                            </div>
                            <button className="remove-btn" onClick={() => removeSong(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-queue">Queue is empty</p>
            )}
        </div>
    );
};

export default Queue;