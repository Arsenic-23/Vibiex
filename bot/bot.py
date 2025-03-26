import websockets
import asyncio
import json
import os
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import CommandHandler, Application

BOT_TOKEN = os.getenv("BOT_TOKEN")
BACKEND_WS_URL = os.getenv("SOCKET_URL", "ws://localhost:5000")

async def send_command(action, song_name=None):
    """ Sends a playback command to the backend WebSocket """
    try:
        async with websockets.connect(BACKEND_WS_URL) as ws:
            message = {"type": "COMMAND", "action": action}
            if song_name:
                message["song"] = song_name
            await ws.send(json.dumps(message))
    except Exception as e:
        print(f"Failed to send command to backend: {e}")

async def handle_play_command(update, context):
    song_name = " ".join(context.args)
    if not song_name:
        await update.message.reply_text("Please provide a song name.")
        return

    await send_command("PLAY", song_name)
    mini_app_link = "https://yourapp.com"  # Replace with actual mini-app URL
    keyboard = [[InlineKeyboardButton("🎵 Join Stream", url=f"{mini_app_link}/")]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(f"Playing: {song_name} 🎶", reply_markup=reply_markup)

async def handle_skip_command(update, context):
    await send_command("SKIP")
    await update.message.reply_text("Skipping to the next song ⏭")

async def handle_end_command(update, context):
    await send_command("END")
    await update.message.reply_text("Playback has been stopped ❌")

async def handle_playforce_command(update, context):
    song_name = " ".join(context.args)
    if not song_name:
        await update.message.reply_text("Please provide a song name.")
        return

    await send_command("PLAYFORCE", song_name)
    await update.message.reply_text(f"Forcing playback of: {song_name} 🚀")

app = Application.builder().token(BOT_TOKEN).build()
app.add_handler(CommandHandler("play", handle_play_command))
app.add_handler(CommandHandler("skip", handle_skip_command))
app.add_handler(CommandHandler("end", handle_end_command))
app.add_handler(CommandHandler("playforce", handle_playforce_command))

if __name__ == "__main__":
    print("Bot is running...")
    app.run_polling()