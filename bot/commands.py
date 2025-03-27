import json

async def handle_command(data):
    """
    Process bot commands and return appropriate responses.
    
    Commands handled:
    - play [song]
    - skip
    - queue
    - force play [song]
    - end
    """
    command_type = data.get("command")
    user = data.get("user", "Unknown User")
    song = data.get("song", "")

    if command_type == "play":
        return {"type": "play", "message": f"{user} played: {song}"}

    elif command_type == "skip":
        return {"type": "skip", "message": f"{user} skipped the current song."}

    elif command_type == "queue":
        return {"type": "queue", "message": f"{user} checked the queue."}

    elif command_type == "force_play":
        return {"type": "force_play", "message": f"{user} forced play: {song}"}

    elif command_type == "end":
        return {"type": "end", "message": f"{user} ended the stream."}

    else:
        return {"type": "error", "message": "Invalid command received."}