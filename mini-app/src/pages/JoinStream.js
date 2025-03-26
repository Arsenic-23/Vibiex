import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinStream = () => {
    const [joining, setJoining] = useState(false);
    const navigate = useNavigate();

    const handleJoin = () => {
        setJoining(true);
        setTimeout(() => navigate("/player"), 1000); // Redirect to player after 1 second
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>🎵 Join the Music Stream</h2>
            <p>Do you want to join the live music stream?</p>
            <button onClick={handleJoin} disabled={joining}>
                {joining ? "Joining..." : "✅ Join Now"}
            </button>
            <button onClick={() => navigate("/")}>❌ Cancel</button>
        </div>
    );
};

export default JoinStream;