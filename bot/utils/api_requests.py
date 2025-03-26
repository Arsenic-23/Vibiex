# api_requests.py - Handles API calls to backend 🎯

import aiohttp
import asyncio
import json

API_BASE_URL = "http://localhost:5000/api"  # Backend API endpoint 🌐

async def fetch_song_data(song_name):
    """Fetches song metadata from the backend."""
    url = f"{API_BASE_URL}/search?song_name={song_name}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                data = await response.json()
                return data
            else:
                return {"error": "⚠️ Failed to retrieve song data."}

async def add_song_to_backend_queue(song_name, url, user_id):
    """Adds song details to backend queue."""
    url = f"{API_BASE_URL}/queue/add"
    payload = {
        "song_name": song_name,
        "url": url,
        "requested_by": user_id
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload) as response:
            if response.status == 200:
                return await response.json()
            else:
                return {"error": "⚠️ Failed to add song to the backend queue."}

async def sync_queue_with_backend():
    """Synchronizes the local queue with the backend queue."""
    url = f"{API_BASE_URL}/queue/sync"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                data = await response.json()
                return data['queue']
            else:
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
            else:
                return {"error": "⚠️ Failed to update user profile."}

async def fetch_user_profile(user_id):
    """Fetches user profile stats."""
    url = f"{API_BASE_URL}/user/{user_id}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                data = await response.json()
                return data
            else:
                return {"error": "⚠️ Failed to retrieve user profile."}