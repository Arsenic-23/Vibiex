import asyncio
import websockets
import json
import logging

# WebSocket server URL (Replace with your actual WebSocket backend URL)
WS_SERVER_URL = "ws://localhost:5000/ws"

async def connect_to_websocket():
    """
    Connects to the backend WebSocket server and listens for messages.
    """
    try:
        async with websockets.connect(WS_SERVER_URL) as websocket:
            logging.info("Connected to WebSocket server.")

            while True:
                try:
                    message = await websocket.recv()
                    data = json.loads(message)
                    logging.info(f"Received WebSocket message: {data}")

                    # Process the received message (e.g., command execution)
                    response = await handle_message(data)

                    if response:
                        await websocket.send(json.dumps(response))
                        logging.info(f"Sent WebSocket response: {response}")

                except json.JSONDecodeError:
                    logging.error("Error decoding JSON message.")
                except Exception as e:
                    logging.error(f"WebSocket error: {e}")

    except Exception as e:
        logging.error(f"Failed to connect to WebSocket: {e}")
        await asyncio.sleep(5)  # Retry connection after delay
        await connect_to_websocket()  # Reconnect

async def handle_message(data):
    """
    Handles incoming WebSocket messages and processes bot commands.
    """
    command = data.get("command")

    if command:
        from commands import handle_command
        response = await handle_command(data)
        return response

    return None

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(connect_to_websocket())