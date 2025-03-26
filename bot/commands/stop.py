# stop.py - Handles /stop command 🛑

from pyrogram import Client, filters
from pyrogram.types import Message
from utils.queue_handler import clear_queue

@app.on_message(filters.command("stop") & filters.group)
async def stop_song_command(client: Client, message: Message):
    success = clear_queue(message.chat.id)

    if success:
        await message.reply_text("🕊️ Music playback stopped and queue cleared!")
    else:
        await message.reply_text("⚠️ No active queue to stop!")