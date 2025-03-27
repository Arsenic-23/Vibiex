import discord
from discord.ext import commands
import asyncio
import logging
from config import BOT_TOKEN, PREFIX
from commands import handle_play, handle_skip, handle_queue, handle_force_play, handle_end
from websocket_client import send_websocket_message, start_websocket_listener

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("VibiexBot")

# Bot Initialization
intents = discord.Intents.default()
intents.message_content = True  # Required for message-based commands
bot = commands.Bot(command_prefix=PREFIX, intents=intents)

# WebSocket Listener for Real-time Updates
@bot.event
async def on_ready():
    """Triggered when the bot successfully connects to Discord."""
    logger.info(f"✅ {bot.user.name} is online and connected to Discord!")
    start_websocket_listener()  # Start WebSocket listener

# Play Command
@bot.command(name="play")
async def play(ctx, *, query: str):
    """Handles the !play command to play a song."""
    await handle_play(ctx, query)

# Skip Command
@bot.command(name="skip")
async def skip(ctx):
    """Handles the !skip command to skip the current song."""
    await handle_skip(ctx)

# Queue Command
@bot.command(name="queue")
async def queue(ctx):
    """Handles the !queue command to display the song queue."""
    await handle_queue(ctx)

# Force Play Command
@bot.command(name="forceplay")
async def force_play(ctx, *, query: str):
    """Handles the !forceplay command to immediately play a song."""
    await handle_force_play(ctx, query)

# End Command
@bot.command(name="end")
async def end(ctx):
    """Handles the !end command to stop playback."""
    await handle_end(ctx)

# Send WebSocket Update when a User Joins the Stream
@bot.event
async def on_message(message):
    """Handles messages to check for 'Join Stream' button clicks."""
    if message.author == bot.user:
        return  # Ignore messages from the bot itself

    if "Join Stream" in message.content:
        user_data = {
            "type": "user_joined",
            "username": message.author.name,
            "user_id": message.author.id,
        }
        await send_websocket_message(user_data)  # Notify backend via WebSocket
    
    await bot.process_commands(message)  # Ensure commands still work

# Run the Bot
bot.run(BOT_TOKEN)