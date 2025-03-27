import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Bot Configuration
BOT_TOKEN = os.getenv("BOT_TOKEN")  # Your bot's token from Discord/Telegram
BOT_PREFIX = os.getenv("BOT_PREFIX", "!")  # Command prefix (default: !)

# WebSocket Configuration
WS_SERVER_URL = os.getenv("WS_SERVER_URL", "ws://localhost:5000/ws")  # WebSocket backend URL

# API Configuration
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000/api")  # Backend API URL

# Logging Configuration
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")  # Logging level (DEBUG, INFO, WARNING, ERROR)

# Music Settings
DEFAULT_VOLUME = int(os.getenv("DEFAULT_VOLUME", 50))  # Default bot volume (0-100)
ALLOWED_SOURCES = os.getenv("ALLOWED_SOURCES", "youtube,spotify").split(",")  # Allowed music sources

# Error Handling
AUTO_RECONNECT = os.getenv("AUTO_RECONNECT", "True").lower() == "true"  # Auto-reconnect on failure

# Function to display current bot settings
def print_config():
    print(f"BOT CONFIGURATION:")
    print(f"  - BOT_TOKEN: {'SET' if BOT_TOKEN else 'NOT SET'}")
    print(f"  - BOT_PREFIX: {BOT_PREFIX}")
    print(f"  - WS_SERVER_URL: {WS_SERVER_URL}")
    print(f"  - API_BASE_URL: {API_BASE_URL}")
    print(f"  - LOG_LEVEL: {LOG_LEVEL}")
    print(f"  - DEFAULT_VOLUME: {DEFAULT_VOLUME}")
    print(f"  - ALLOWED_SOURCES: {ALLOWED_SOURCES}")
    print(f"  - AUTO_RECONNECT: {AUTO_RECONNECT}")

if __name__ == "__main__":
    print_config()