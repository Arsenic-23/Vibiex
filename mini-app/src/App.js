import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinStream from "./pages/JoinStream";
import Player from "./components/Player";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<JoinStream />} />
                <Route path="/player" element={<Player />} />
            </Routes>
        </Router>
    );
}

export default App;