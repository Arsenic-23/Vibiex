import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinStream.css";

const JoinStream = () => {
    const [joining, setJoining] = useState(false);
    const navigate = useNavigate();

    const handleJoin = () => {
        setJoining(true);
        setTimeout(() => navigate("/player"), 1000); // Redirect to player after 1 second
    };

    return (
        <div className="join-container">
            <h2>🎵 Welcome to Vibie Music Stream</h2>
            <p>Join now to listen to high-quality music in real-time!</p>
            <button onClick={handleJoin} disabled={joining} className="join-btn">
                {joining ? "Joining..." : "✅ Join Now"}
            </button>
            <button onClick={() => navigate("/")} className="cancel-btn">❌ Cancel</button>
        </div>
    );
};

export default JoinStream;