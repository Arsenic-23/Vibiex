# Vibe Together 🎧

Vibe Together is a powerful music streaming platform that integrates a Telegram Bot and a Mini App with seamless queue management, song playback, and real-time sync.

---

## 📚 Project Structure

/vibe-together ├── /bot                        # Telegram Bot Folder │   ├── /commands               # Bot commands (play, skip, etc.) │   ├── /utils                  # Utility functions │   ├── bot.py                  # Main bot logic and WebSocket connection │   ├── config.py               # Bot configuration (API keys, tokens, etc.) │   └── requirements.txt        # Bot dependencies ├── /mini-app                   # Mini App Folder (React/Flutter) │   ├── /public │   ├── /src │   └── package.json ├── /backend                    # Backend APIs (Node.js/FastAPI) │   ├── /api │   ├── /models │   ├── /ws │   ├── app.js │   └── package.json ├── /websocket                  # WebSocket Server │   ├── /handlers │   ├── server.py │   └── requirements.txt ├── /docs                       # Documentation and setup │   └── API.md                  # API endpoints documentation └── README.md                   # Project overview and setup instructions

---

## 🎯 Key Features
- Real-time queue management with WebSocket sync.
- Interactive Mini App with song search, queue display, and profile stats.
- Telegram Bot to control playback and manage queue remotely.

---

## 📦 Setup Instructions
### Prerequisites
- Node.js, npm/yarn for Backend and Mini App.
- Python 3.10+ for WebSocket and Bot.

---

### 🚀 Installation
1. Clone the repository:
```bash
git clone https://github.com/your-repo/vibe-together.git
cd vibe-together

2. Install dependencies:



# Backend
cd backend
npm install

# Mini App
cd ../mini-app
npm install

# Bot
cd ../bot
pip install -r requirements.txt


---

⚡ Starting Services

Backend

cd backend
node app.js

Mini App

cd mini-app
npm start

Bot

cd bot
python3 bot.py


---

🔗 API Endpoints

GET /api/queue - Fetch current queue.

POST /api/queue/add - Add song to queue.

DELETE /api/queue/remove/:id - Remove song from queue.



---

📡 WebSocket Events

play_song - Triggered when a song starts.

queue_update - Triggered when queue is updated.



---

⚙️ Configuration

Set environment variables in .env for:

Telegram Bot Token

Backend API URL

WebSocket Server URL



---

📝 License

This project is licensed under the MIT License.

---

### 📄 **/vibe-together/docs/API.md**  
```markdown
# 📡 Vibe Together API Documentation

This document outlines the API endpoints used by Vibe Together to manage queues, playlists, and user stats.

---

## 🎵 Queue API
### `GET /api/queue`
- Fetch the current queue with song details.
- **Response:**
```json
{
  "queue": [
    {
      "id": 1,
      "title": "Song Name",
      "duration": "03:45"
    }
  ]
}


---

POST /api/queue/add

Add a new song to the queue.

Request Body:


{
  "title": "Song Name",
  "url": "https://example.com/song.mp3"
}

Response:


{
  "message": "Song added to queue successfully"
}


---

DELETE /api/queue/remove/:id

Remove a song from the queue by ID.

Response:


{
  "message": "Song removed successfully"
}


---

🧑‍🎤 User API

GET /api/user/:id

Get user profile and listening stats.

Response:


{
  "id": "1234",
  "username": "JohnDoe",
  "songs_played": 50,
  "playtime": "3h 45m"
}


---

🎧 Playlist API

POST /api/playlist/import

Import a playlist from an external source.

Request Body:


{
  "url": "https://example.com/playlist"
}

Response:


{
  "message": "Playlist imported successfully"
}


---

📡 WebSocket Events

play_song - Triggered when a new song is played.

queue_update - Sent when queue is updated.


---

🎉 **✅ `/docs/README.md` and `/docs/API.md` Ready!**  
🔥 **Next:** Do you want the WebSocket documentation or final README for the project? 🚀

