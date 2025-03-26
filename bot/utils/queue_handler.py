# queue_handler.py - Handles song queue management 🎶

from typing import Dict, List

# Dictionary to maintain queues per group
queue: Dict[int, List[str]] = {}

def add_to_queue(chat_id: int, song_url: str):
    """Adds a song to the queue for a group."""
    if chat_id not in queue:
        queue[chat_id] = []
    queue[chat_id].append(song_url)
    return True

def get_queue(chat_id: int):
    """Returns the queue for a group."""
    return queue.get(chat_id, [])

def clear_queue(chat_id: int):
    """Clears the queue for a group."""
    if chat_id in queue:
        queue.pop(chat_id)
        return True
    return False

def skip_song(chat_id: int):
    """Skips the current song in the queue."""
    if chat_id in queue and queue[chat_id]:
        queue[chat_id].pop(0)
        return True
    return False

def is_queue_empty(chat_id: int):
    """Checks if the queue is empty."""
    return len(queue.get(chat_id, [])) == 0