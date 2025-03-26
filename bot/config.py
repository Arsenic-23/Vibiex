# config.py - Bot Configuration 🎧

import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# API and Bot Config
API_ID = int(os.getenv("API_ID"))
API_HASH = os.getenv("API_HASH")
BOT_TOKEN = os.getenv("BOT_TOKEN")

# WebSocket Configuration 🚀
WEBSOCKET_URL = os.getenv("WEBSOCKET_URL", "ws://localhost:8000")

# Media Storage Path 📂
MEDIA_PATH = os.getenv("MEDIA_PATH", "./media")

# Admin User IDs (For Bot Control) 🦋
ADMIN_IDS = [int(uid) for uid in os.getenv("ADMIN_IDS", "").split(",") if uid]