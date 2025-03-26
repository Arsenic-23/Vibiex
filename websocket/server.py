import asyncio
import websockets
import json

connected_clients = set()

async def handler(websocket, path):
    # Register client
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            # Broadcast message to all clients
            await asyncio.gather(*[client.send(json.dumps(data)) for client in connected_clients])
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        # Remove client on disconnect
        connected_clients.remove(websocket)

async def main():
    async with websockets.serve(handler, "0.0.0.0", 8765):
        await asyncio.Future()  # Keep the server running

if __name__ == "__main__":
    asyncio.run(main())