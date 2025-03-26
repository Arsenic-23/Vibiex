# skip.py - Handles /skip command ⏭️

from pyrogram import Client, filters
from pyrogram.types import Message
from utils.queue_handler import skip_song, get_queue

@app.on_message(filters.command("skip") & filters.group)
async def skip_song_command(client: Client, message: Message):
    queue = get_queue(message.chat.id)
    
    if not queue or len(queue) <= 1:
        await message.reply_text("🕊️ No more songs in the queue to skip.")
        return

    skipped_song = skip_song(message.chat.id)
    if skipped_song:
        await message.reply_text(f"⏩ Skipped [{skipped_song['title']}] and playing next!")
    else:
        await message.reply_text("⚠️ Could not skip the song. Try again.")