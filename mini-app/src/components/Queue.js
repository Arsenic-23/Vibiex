import React, { useContext } from "react";
import { WebSocketContext } from "../utils/websocket";
import { FaPlay, FaTrash } from "react-icons/fa";

function Queue() {
  const { queue, playFromQueue, removeFromQueue } = useContext(WebSocketContext);

  return (
    <div className="queue">
      <h2>Queue</h2>
      {queue.length > 0 ? (
        <ul>
          {queue.map((song, index) => (
            <li key={index} className="queue-item">
              <img src={song.thumbnail} alt={song.title} className="queue-thumbnail" />
              <div className="queue-details">
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
              <div className="queue-actions">
                <FaPlay onClick={() => playFromQueue(index)} className="queue-icon" />
                <FaTrash onClick={() => removeFromQueue(index)} className="queue-icon" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Queue is empty</p>
      )}
    </div>
  );
}

export default Queue;