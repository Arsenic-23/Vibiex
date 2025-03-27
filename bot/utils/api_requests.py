 # api_requests.py - Handles API calls to backend 🎯

import aiohttp
import asyncio
import json
import os

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000/api")  # Backend API endpoint 🌐

async def fetch_song_data(song_name):
    """Fetches song metadata from the backend."""
    url = f"{API_BASE_URL}/search?song_name={song_name}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.json()
            return {"error": "⚠️ Failed to retrieve song data."}

async def add_song_to_backend_queue(room_id, song_name, song_url, user_id):
    """Adds song details to the backend queue for a specific room."""
    url = f"{API_BASE_URL}/queue/{room_id}"
    payload = {
        "title": song_name,
        "url": song_url,
        "addedBy": user_id
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload) as response:
            if response.status == 200:
                return await response.json()
            return {"error": "⚠️ Failed to add song to the backend queue."}

async def sync_queue_with_backend(room_id):
    """Synchronizes the local queue with the backend queue for a specific room."""
    url = f"{API_BASE_URL}/queue/{room_id}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                data = await response.json()
                return data.get('queue', [])
            return {"error": "⚠️ Failed to sync queue with backend."}

async def update_user_profile(user_id, action, details):
    """Updates user profile stats on the backend."""
    url = f"{API_BASE_URL}/user/update"
    payload = {
        "user_id": user_id,
        "action": action,
        "details": details
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload) as response:
            if response.status == 200:
                return await response.json()
            return {"error": "⚠️ Failed to update user profile."}

async def fetch_user_profile(user_id):
    """Fetches user profile stats."""
    url = f"{API_BASE_URL}/user/{user_id}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.json()
            return {"error": "⚠️ Failed to retrieve user profile."}

async def import_playlist(playlist_url):
    """Imports a playlist from an external source into the Vibie system."""
    url = f"{API_BASE_URL}/playlist/import"
    payload = {"playlistUrl": playlist_url}
    
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload) as response:
            if response.status == 200:
                return await response.json()
            return {"error": "⚠️ Failed to import playlist."}