# download.py - Handles song downloads & storage 🎧

import yt_dlp
import os
import asyncio

# Directory to store downloaded songs 🎶
MEDIA_DIR = "./media"

if not os.path.exists(MEDIA_DIR):
    os.makedirs(MEDIA_DIR)

async def download_song(song_url, song_name):
    """Downloads and stores the song locally using yt-dlp."""
    song_path = os.path.join(MEDIA_DIR, f"{song_name}.mp3")

    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": song_path,
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "192"
        }],
        "quiet": True
    }

    try:
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(None, lambda: yt_dlp.YoutubeDL(ydl_opts).download([song_url]))
        return song_path
    except Exception as e:
        print(f"⚠️ Error downloading {song_name}: {e}")
        return None

async def delete_song(song_name):
    """Deletes a downloaded song."""
    song_path = os.path.join(MEDIA_DIR, f"{song_name}.mp3")
    try:
        if os.path.exists(song_path):
            os.remove(song_path)
            return True
        return False
    except Exception as e:
        print(f"⚠️ Error deleting {song_name}: {e}")
        return False