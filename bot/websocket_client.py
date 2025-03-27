import asyncio
import websockets
import json
import logging
from config import WEBSOCKET_SERVER_URL

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("WebSocketClient")

# WebSocket Client Connection
async def send_websocket_message(message):
    """Sends a JSON message to the WebSocket server and waits for a response."""
    try:
        async with websockets.connect(WEBSOCKET_SERVER_URL) as websocket:
            await websocket.send(json.dumps(message))
            response = await websocket.recv()
            return json.loads(response)  # Parse JSON response

    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        return "⚠ Connection error. Please try again later."

# WebSocket Listener for Real-time Updates
async def websocket_listener():
    """Continuously listens for messages from the WebSocket server."""
    while True:
        try:
            async with websockets.connect(WEBSOCKET_SERVER_URL) as websocket:
                logger.info("Connected to WebSocket server.")
                
                async for message in websocket:
                    data = json.loads(message)
                    logger.info(f"Received WebSocket update: {data}")
                    
                    # Handle different WebSocket messages from backend
                    if data.get("type") == "now_playing":
                        logger.info(f"🎵 Now Playing: {data['song']}")

        except Exception as e:
            logger.error(f"WebSocket connection lost. Reconnecting in 5 seconds... ({e})")
            await asyncio.sleep(5)  # Reconnect after a short delay

# Start the WebSocket listener in the background
def start_websocket_listener():
    """Starts the WebSocket listener asynchronously."""
    loop = asyncio.get_event_loop()
    loop.create_task(websocket_listener())