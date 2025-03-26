# bot.py - Main bot logic 🎧

from pyrogram import Client, filters
from pyrogram.types import Message
from utils.queue_handler import add_to_queue, skip_song, stop_queue
from utils.download import download_song
from config import API_ID, API_HASH, BOT_TOKEN, MEDIA_PATH, WEBSOCKET_URL
import websockets
import asyncio
import os

# Initialize the bot
app = Client(
    "VibieBot",
    api_id=API_ID,
    api_hash=API_HASH,
    bot_token=BOT_TOKEN
)

# /play command 🎶
@app.on_message(filters.command("play") & filters.group)
async def play_song(client: Client, message: Message):
    query = " ".join(message.command[1:])
    if not query:
        await message.reply_text("🕊️ Please provide a song name or URL to play.")
        return
    
    msg = await message.reply_text(f"💅 Searching for '{query}'...")

    # Download song
    audio_path, title, duration = await download_song(query)
    if not audio_path:
        await msg.edit("🚨 Couldn't download the song. Try again later.")
        return

    # Add to queue
    add_to_queue(message.chat.id, audio_path, title, duration)
    await msg.edit(f"🎵 Added [{title}]({audio_path}) to the queue.")

    # Notify Mini App
    await notify_miniapp(action="play", title=title, duration=duration, chat_id=message.chat.id)

# /skip command ⏭️
@app.on_message(filters.command("skip") & filters.group)
async def skip(client: Client, message: Message):
    if skip_song(message.chat.id):
        await message.reply_text("⏭️ Skipped to the next song.")
        await notify_miniapp(action="skip", chat_id=message.chat.id)
    else:
        await message.reply_text("🎵 No more songs in the queue!")

# /stop command ⏹️
@app.on_message(filters.command("stop") & filters.group)
async def stop(client: Client, message: Message):
    stop_queue(message.chat.id)
    await message.reply_text("⏹️ Stopped the playback.")
    await notify_miniapp(action="stop", chat_id=message.chat.id)

# Notify Mini App via WebSocket 🚀
async def notify_miniapp(action, title=None, duration=None, chat_id=None):
    data = {
        "action": action,
        "title": title,
        "duration": duration,
        "chat_id": chat_id
    }
    async with websockets.connect(WEBSOCKET_URL) as websocket:
        await websocket.send(str(data))

# Start the bot 🚀
print("Vibie Bot is up and running! 🎧")
app.run()