
# 🎧 Vibie - Telegram Music Bot arsenic~

VibieX is a powerful Telegram bot that plays music in groups. It integrates YouTube downloads, song queuing, and real-time WebSocket updates for seamless playback.  

## 🚀 Features  
- **Play music** from YouTube via `/play` command.  
- **Queue system** for managing multiple song requests.  
- **Skip & stop playback** with `/skip` and `/stop`.  
- **WebSocket integration** for real-time updates.  

## 📂 Project Structure

VibieX/ │── bot/ │   │── bot.py              # Main bot logic │   │── config.py           # Configuration settings │   │── requirements.txt    # Dependencies │   ├── utils/ │   │   ├── queue_handler.py  # Handles music queue │   │   ├── download.py       # Downloads music │── websocket/ │   │── server.py           # WebSocket server │   │── handlers/           # WebSocket event handlers │── README.md               # Project documentation

---

## 🔧 Installation  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-repo/VibieX.git  
cd VibieX

2️⃣ Install Dependencies

pip install -r bot/requirements.txt  
pip install -r websocket/requirements.txt

3️⃣ Set Up Environment Variables

Create a .env file in the bot/ directory with:

API_ID=your_api_id
API_HASH=your_api_hash
BOT_TOKEN=your_bot_token
MEDIA_PATH=./media
WEBSOCKET_URL=ws://localhost:8765


---

▶️ Running the Bot

Start the bot:

python bot/bot.py

Start the WebSocket server:

python websocket/server.py


---

🎮 Commands


---

🌐 WebSocket API

Endpoint: ws://localhost:8765

Events:

play: Starts a song

queue_update: Updates queue



Example message:

{
  "event": "play",
  "title": "Song Name",
  "duration": "3:45"
}


---

 
- **Organized structure** ✅  
- **Step-by-step installation** ✅  
- **Detailed command list** ✅  
- **WebSocket API details** ✅  
  **Arsenic-23**



