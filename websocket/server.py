import asyncio
import websockets
import json
from handlers.play_handler import handle_play_event
from handlers.queue_handler import handle_queue_event

# Store connected clients
connected_clients = set()

async def handle_client(websocket, path):
    """Handles incoming WebSocket connections and messages."""
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            try:
                data = json.loads(message)
                event = data.get("event")

                # Handle different WebSocket events
                if event == "play":
                    await handle_play_event(websocket, data, connected_clients)
                elif event == "queue_update":
                    await handle_queue_event(websocket, data, connected_clients)
                else:
                    await websocket.send(json.dumps({"error": "Unknown event"}))
            except json.JSONDecodeError:
                await websocket.send(json.dumps({"error": "Invalid JSON format"}))
    except websockets.exceptions.ConnectionClosedError:
        print("Client disconnected unexpectedly.")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        connected_clients.discard(websocket)

async def main():
    """Starts the WebSocket server."""
    server = await websockets.serve(handle_client, "0.0.0.0", 8765)
    print("WebSocket server started on ws://0.0.0.0:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())