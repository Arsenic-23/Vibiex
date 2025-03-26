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

    # yt-dlp options for downloading 🎥
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

    loop = asyncio.get_event_loop()
    try:
        await loop.run_in_executor(None, lambda: yt_dlp.YoutubeDL(ydl_opts).download([song_url]))
        return song_path
    except Exception as e:
        return {"error": f"⚠️ Failed to download song: {str(e)}"}

async def delete_song(song_name):
    """Deletes the downloaded song to clear space."""
    song_path = os.path.join(MEDIA_DIR, f"{song_name}.mp3")
    if os.path.exists(song_path):
        os.remove(song_path)
        return {"success": f"✅ Deleted {song_name}."}
    else:
        return {"error": "⚠️ Song not found."}

async def list_downloaded_songs():
    """Lists all downloaded songs in the media directory."""
    return [f for f in os.listdir(MEDIA_DIR) if f.endswith(".mp3")]