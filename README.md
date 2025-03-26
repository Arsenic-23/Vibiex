# Vibiex

Vibe Together is a collaborative music platform that connects a Telegram Bot and a Mini App to allow users to manage queues, play songs, and sync playback across multiple devices in real-time. It also provides an admin panel for better room management and user stats.

---

## 📚 Project Structure

/vibe-together ├── /bot                        # Telegram Bot Folder │   ├── /commands               # Bot commands (play, skip, etc.) │   ├── /utils                  # Utility functions │   ├── bot.py                  # Main bot logic and WebSocket connection │   ├── config.py               # Bot configuration (API keys, tokens, etc.) │   └── requirements.txt        # Bot dependencies (pyrogram, aiohttp, etc.) ├── /mini-app                   # Mini App Folder (React/Flutter) │   ├── /public │   ├── /src │   └── package.json ├── /backend                    # Backend APIs (Node.js/FastAPI) │   ├── /api │   ├── /models │   ├── /ws │   ├── app.js │   └── package.json ├── /websocket                  # WebSocket Server │   ├── /handlers │   ├── server.py │   └── requirements.txt ├── /docs                       # Documentation and setup │   └── API.md                  # API endpoints documentation └── README.md                   # Project overview and setup instructions

---

## 🎯 Key Features
- 📡 **Real-Time Sync:** WebSocket integration for instant queue updates.
- 🎵 **Queue Management:** Add, skip, or stop songs in real time.
- 🎮 **Mini App Interface:** A sleek UI for music control and user stats.
- 🤖 **Telegram Bot:** Control playback remotely through simple commands.
- 👑 **Admin Panel:** Manage users, control rooms, and view queue history.

---

## 📦 Setup Instructions
### Prerequisites
- **Backend:** Node.js (v16+), npm/yarn.
- **Mini App:** React or Flutter with dependencies.
- **Bot/WebSocket:** Python 3.10+.

---

### 🚀 Installation
1. **Clone the repository:**
```bash
git clone https://github.com/your-repo/vibe-together.git
cd vibe-together

2. Backend Setup:



cd backend
npm install

3. Mini App Setup:



cd ../mini-app
npm install

4. Bot Setup:



cd ../bot
pip install -r requirements.txt

5. WebSocket Setup:



cd ../websocket
pip install -r requirements.txt


---

⚡ Running Services

Backend

cd backend
node app.js

Mini App

cd mini-app
npm start

Bot

cd bot
python3 bot.py

WebSocket Server

cd websocket
python3 server.py


---

🔗 API Endpoints

GET /api/queue - Fetch current queue.

POST /api/queue/add - Add a song to the queue.

DELETE /api/queue/remove/:id - Remove a song from the queue.

GET /api/user/:id - Get user profile and listening stats.



---

📡 WebSocket Events

play_song - Triggered when a new song starts.

queue_update - Sent when queue is updated.

user_joined - Triggered when a user joins the session.



---

⚙️ Configuration

Environment Variables (.env File)

Create a .env file in the root directory with the following:

BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
API_URL=http://localhost:3000
WEBSOCKET_URL=ws://localhost:8080


---

🤖 Telegram Bot Commands

/play [song name] - Play a song or add to queue.

/skip - Skip the current song.

/stop - Stop playback.



---

📝 Contributing

We welcome contributions! Fork the repository and make pull requests to improve the project.


---

🛡️ License

This project is licensed under the MIT License. See LICENSE for details.

---

🎉 **✅ `/README.md` Ready!**  
🔥 **Next:** Do you need deployment instructions or WebSocket details? 🚀

