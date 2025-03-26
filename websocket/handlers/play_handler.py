import json
from websockets.exceptions import ConnectionClosed

async def handle_play_event(websocket, data, connected_clients):
    try:
        # Prepare play event message
        play_event = {
            "event": "play",
            "song_url": data.get("song_url"),
            "song_name": data.get("song_name"),
            "position": data.get("position", 0),
        }

        # Broadcast the play event to all connected clients
        await asyncio.gather(
            *[client.send(json.dumps(play_event)) for client in connected_clients]
        )
    except ConnectionClosed:
        # Handle client disconnection
        pass