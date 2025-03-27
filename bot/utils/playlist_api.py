import aiohttp
import os

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000/api")

async def import_playlist(playlist_url):
    """
    Import a playlist from an external source into the Vibie system.
    """
    url = f"{API_BASE_URL}/playlist/import"
    payload = {"playlistUrl": playlist_url}
    
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload) as response:
            return await response.json()