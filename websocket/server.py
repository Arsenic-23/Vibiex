import asyncio
import websockets
import json
from handlers.play_handler import handle_play_event
from handlers.queue_handler import handle_queue_event

# Store connected clients
connected_clients = set()

async def handle_client(websocket, path):
    # Add client to connected list
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            event = data.get("event")

            # Handle different WebSocket events
            if event == "play":
                await handle_play_event(websocket, data, connected_clients)
            elif event == "queue_update":
                await handle_queue_event(websocket, data, connected_clients)
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        # Remove client from connected list
        connected_clients.remove(websocket)

async def main():
    # Start WebSocket server
    server = await websockets.serve(handle_client, "0.0.0.0", 8765)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())