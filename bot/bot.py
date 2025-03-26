# bot.py - Main Bot Logic + WebSocket Connection 🕊️

import os
import asyncio
from pyrogram import Client, filters
from pyrogram.types import Message
from utils.queue_handler import QueueManager
from utils.api_requests import send_play_request
from utils.download import download_audio

# Bot Configuration
API_ID = os.getenv("API_ID")
API_HASH = os.getenv("API_HASH")
BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBSOCKET_URL = os.getenv("WEBSOCKET_URL")

# Initialize Bot
app = Client("VibieBot", api_id=API_ID, api_hash=API_HASH, bot_token=BOT_TOKEN)
queue = QueueManager()

# /start Command 💅
@app.on_message(filters.command("start"))
async def start(_, message: Message):
    await message.reply_text("🦋 Welcome to Vibie! Type /play to start listening together! 🎶")

# /play Command 🚀
@app.on_message(filters.command("play"))
async def play(_, message: Message):
    query = " ".join(message.command[1:])
    if not query:
        await message.reply_text("💅 Please provide a song name or link to play! 🎧")
        return
    
    await message.reply_text(f"🎶 Searching for {query}... Please wait! 🕊️")
    
    # Download and Get File URL
    audio_path = await download_audio(query)
    if not audio_path:
        await message.reply_text("🚫 Unable to download the requested song. Try another one!")
        return
    
    # Send WebSocket Event to Mini App
    await send_play_request(audio_path)
    
    # Add to Queue
    queue.add_to_queue(query, audio_path)
    await message.reply_text(f"🎧 Now playing: {query}!")

# /skip Command 💨
@app.on_message(filters.command("skip"))
async def skip(_, message: Message):
    skipped_song = queue.skip_track()
    if skipped_song:
        await message.reply_text(f"🚀 Skipped: {skipped_song}")
    else:
        await message.reply_text("⚠️ No song in queue to skip!")

# /stop Command ⏹️
@app.on_message(filters.command("stop"))
async def stop(_, message: Message):
    queue.clear_queue()
    await message.reply_text("🕊️ Playback stopped and queue cleared!")

# Start the Bot
app.run()