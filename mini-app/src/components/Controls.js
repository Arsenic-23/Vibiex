import io from "socket.io-client";
import "./Controls.css";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
const socket = io(SOCKET_URL);

const Controls = () => {
    const sendCommand = (action) => {
        socket.emit("COMMAND", { action: action });
    };

    return (
        <div className="controls-container">
            <button onClick={() => sendCommand("PLAY")} className="control-btn">▶️ Play</button>
            <button onClick={() => sendCommand("SKIP")} className="control-btn">⏭ Skip</button>
            <button onClick={() => sendCommand("END")} className="control-btn">⏹ Stop</button>
        </div>
    );
};

export default Controls;