# play.py - Handles /play command with download logic 🎶

from pyrogram import Client, filters
from pyrogram.types import Message
from utils.queue_handler import add_to_queue
from utils.download import download_song
from config import MEDIA_PATH

@app.on_message(filters.command("play") & filters.group)
async def play_song(client: Client, message: Message):
    query = " ".join(message.command[1:])
    if not query:
        await message.reply_text("🕊️ Please provide a song name or URL to play.")
        return

    msg = await message.reply_text(f"💅 Searching for '{query}'...")

    # Download the song and get its path
    audio_path, title, duration = await download_song(query)
    if not audio_path:
        await msg.edit("🚨 Couldn't download the song. Try again later.")
        return

    # Add to the queue and notify the user
    add_to_queue(message.chat.id, audio_path, title, duration)
    await msg.edit(f"🎵 Added [{title}]({audio_path}) to the queue.")