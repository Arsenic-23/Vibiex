# queue_handler.py - Queue and user management 🎵

import asyncio

# Global variables to store queue and user data
song_queue = []
current_song = None
user_playlists = {}

async def add_to_queue(song_name, url, user_id):
    """Adds a song to the queue."""
    song_data = {
        'song_name': song_name,
        'url': url,
        'requested_by': user_id
    }
    song_queue.append(song_data)
    return f"🎶 **{song_name}** added to the queue!"

async def get_queue():
    """Returns the current queue."""
    if not song_queue:
        return "🚫 Queue is empty."
    queue_list = [f"🎧 {i+1}. {song['song_name']} - Requested by {song['requested_by']}" for i, song in enumerate(song_queue)]
    return "\n".join(queue_list)

async def play_next_song():
    """Moves to the next song in the queue."""
    global current_song
    if not song_queue:
        current_song = None
        return "🚫 No more songs in the queue!"
    current_song = song_queue.pop(0)
    return f"🎵 Now playing: **{current_song['song_name']}**"

async def add_to_user_playlist(user_id, song_name, url):
    """Adds a song to the user's personal playlist."""
    if user_id not in user_playlists:
        user_playlists[user_id] = []
    user_playlists[user_id].append({'song_name': song_name, 'url': url})
    return f"📝 **{song_name}** added to your playlist!"

async def get_user_playlist(user_id):
    """Returns the user's playlist."""
    if user_id not in user_playlists or not user_playlists[user_id]:
        return "🎧 Your playlist is empty."
    playlist = [f"🎵 {i+1}. {song['song_name']}" for i, song in enumerate(user_playlists[user_id])]
    return "\n".join(playlist)

async def clear_queue():
    """Clears the current queue."""
    global song_queue
    song_queue = []
    return "✅ Queue cleared successfully!"

async def get_current_song():
    """Returns the currently playing song."""
    if not current_song:
        return "⏸️ No song is currently playing."
    return f"🎶 Now playing: **{current_song['song_name']}**"