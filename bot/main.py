import asyncio
import websockets
import json
from commands import handle_command
from config import BOT_WS_URL, BOT_NAME

async def connect():
    """Establish connection with WebSocket server and handle messages."""
    while True:
        try:
            async with websockets.connect(BOT_WS_URL) as websocket:
                print(f"{BOT_NAME} connected to WebSocket server.")
                
                # Send bot's presence message
                await websocket.send(json.dumps({"type": "bot_connected", "bot": BOT_NAME}))

                # Listen for incoming messages
                while True:
                    message = await websocket.recv()
                    data = json.loads(message)
                    
                    # Process received command
                    response = await handle_command(data)
                    
                    # Send response back if necessary
                    if response:
                        await websocket.send(json.dumps(response))

        except (websockets.exceptions.ConnectionClosedError, ConnectionRefusedError):
            print("WebSocket connection lost. Reconnecting in 5 seconds...")
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(connect())