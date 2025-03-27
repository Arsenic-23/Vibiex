import os
import asyncio
import websockets
from pyrogram import Client, filters
from config import BOT_TOKEN, API_URL

bot = Client("VibieBot", bot_token=BOT_TOKEN)

# WebSocket connection to backend
WS_URL = API_URL.replace("/api", "/ws")
websocket = None

async def connect_websocket():
    global websocket
    try:
        websocket = await websockets.connect(WS_URL)
        print("[✅] Connected to WebSocket!")
    except Exception as e:
        print(f"[❌] WebSocket Error: {e}")

@bot.on_message(filters.command("play"))
async def play_song(client, message):
    global websocket
    if len(message.command) < 2:
        return await message.reply_text("Please provide a song name or URL!")
    
    song_query = " ".join(message.command[1:])
    
    # Send song request to backend
    if websocket:
        try:
            await websocket.send(f'{{"command": "play", "query": "{song_query}"}}')
            await message.reply_text(f"🎵 Playing: {song_query} in the mini-app!")
        except Exception as e:
            await message.reply_text(f"Error sending song request: {e}")
    else:
        await message.reply_text("WebSocket is not connected!")

@bot.on_message(filters.command("pause"))
async def pause_song(client, message):
    global websocket
    if websocket:
        await websocket.send('{"command": "pause"}')
        await message.reply_text("⏸️ Paused the song in the mini-app!")
    else:
        await message.reply_text("WebSocket is not connected!")

@bot.on_message(filters.command("skip"))
async def skip_song(client, message):
    global websocket
    if websocket:
        await websocket.send('{"command": "skip"}')
        await message.reply_text("⏭️ Skipped to the next song in the mini-app!")
    else:
        await message.reply_text("WebSocket is not connected!")

@bot.on_message(filters.command("resume"))
async def resume_song(client, message):
    global websocket
    if websocket:
        await websocket.send('{"command": "resume"}')
        await message.reply_text("▶️ Resumed the song in the mini-app!")
    else:
        await message.reply_text("WebSocket is not connected!")

@bot.on_message(filters.command("stop"))
async def stop_song(client, message):
    global websocket
    if websocket:
        await websocket.send('{"command": "stop"}')
        await message.reply_text("⏹️ Stopped the music in the mini-app!")
    else:
        await message.reply_text("WebSocket is not connected!")

# Start bot and WebSocket connection
async def start_bot():
    await connect_websocket()
    await bot.start()
    await asyncio.Event().wait()

asyncio.run(start_bot())