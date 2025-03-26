# api_requests.py - Handles API calls to backend 🌐

import requests
import os

API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:5000/api')

def send_song_to_backend(song_url: str, chat_id: int):
    """Sends song data to the backend to update the queue."""
    payload = {
        "chat_id": chat_id,
        "song_url": song_url
    }
    response = requests.post(f"{API_BASE_URL}/queue/add", json=payload)
    return response.json()

def get_queue_from_backend(chat_id: int):
    """Fetches the current queue from the backend."""
    response = requests.get(f"{API_BASE_URL}/queue/get/{chat_id}")
    if response.status_code == 200:
        return response.json()
    return []

def clear_queue_from_backend(chat_id: int):
    """Clears the queue using the backend API."""
    response = requests.delete(f"{API_BASE_URL}/queue/clear/{chat_id}")
    return response.status_code == 200

def auth_user_to_backend(user_id: int, chat_id: int):
    """Authorizes a user via backend API."""
    payload = {
        "user_id": user_id,
        "chat_id": chat_id
    }
    response = requests.post(f"{API_BASE_URL}/auth/user", json=payload)
    return response.json()