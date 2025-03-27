import asyncio
import logging
from websocket_client import send_websocket_message

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("VibiexBot")

# Command Handler Functions
async def play_command(song_name, user):
    """Handles the play command."""
    if not song_name:
        return "❌ Please provide a song name or URL!"
    
    logger.info(f"User {user} requested to play: {song_name}")
    
    # Send request to WebSocket
    response = await send_websocket_message({
        "action": "play",
        "song": song_name,
        "user": user
    })
    
    return response or f"🎵 Now playing: {song_name}"

async def skip_command(user):
    """Handles the skip command."""
    logger.info(f"User {user} requested to skip the current song.")
    
    response = await send_websocket_message({
        "action": "skip",
        "user": user
    })
    
    return response or "⏭ Song skipped!"

async def queue_command():
    """Handles the queue command."""
    logger.info("Fetching current song queue.")

    response = await send_websocket_message({
        "action": "queue"
    })

    if response:
        return "🎶 Current Queue:\n" + "\n".join([f"{idx + 1}. {song}" for idx, song in enumerate(response)])
    else:
        return "🎵 The queue is empty!"

async def end_command(user):
    """Handles the end command."""
    logger.info(f"User {user} requested to end the music session.")
    
    response = await send_websocket_message({
        "action": "end",
        "user": user
    })
    
    return response or "🛑 Music session ended!"

async def force_play_command(song_name, user):
    """Handles the force play command (overrides queue)."""
    if not song_name:
        return "❌ Please provide a song name or URL!"

    logger.info(f"User {user} requested to force play: {song_name}")

    response = await send_websocket_message({
        "action": "force_play",
        "song": song_name,
        "user": user
    })

    return response or f"⚡ Force-playing: {song_name}"

# Command Router
COMMANDS = {
    "play": play_command,
    "skip": skip_command,
    "queue": queue_command,
    "end": end_command,
    "force_play": force_play_command
}

async def handle_command(command, args, user):
    """Processes a command and executes the corresponding function."""
    cmd_func = COMMANDS.get(command)
    
    if cmd_func:
        return await cmd_func(*args, user)
    else:
        return "❌ Unknown command! Available: play, skip, queue, end, force_play"