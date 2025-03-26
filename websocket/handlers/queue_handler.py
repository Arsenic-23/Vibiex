import json
from websockets.exceptions import ConnectionClosed

async def handle_queue_event(websocket, data, connected_clients):
    try:
        # Prepare queue event message
        queue_event = {
            "event": "queue_update",
            "queue": data.get("queue"),
        }

        # Broadcast the updated queue to all connected clients
        await asyncio.gather(
            *[client.send(json.dumps(queue_event)) for client in connected_clients]
        )
    except ConnectionClosed:
        # Handle client disconnection
        pass