# download.py - Handles song downloads and storage 🎧

import yt_dlp
import os
import asyncio

DOWNLOAD_DIR = os.path.join(os.getcwd(), 'bot/media')

# Ensure media directory exists
if not os.path.exists(DOWNLOAD_DIR):
    os.makedirs(DOWNLOAD_DIR)

async def download_song(url: str, song_name: str) -> str:
    """Downloads the song from URL and returns the file path."""
    output_path = os.path.join(DOWNLOAD_DIR, f"{song_name}.mp3")

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_path,
        'noplaylist': True,
        'quiet': True,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '320',
        }],
    }

    loop = asyncio.get_event_loop()
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        await loop.run_in_executor(None, ydl.download, [url])
    
    if os.path.exists(output_path):
        return output_path
    else:
        return None

async def cleanup_downloads():
    """Cleans up downloaded files after usage."""
    for file in os.listdir(DOWNLOAD_DIR):
        file_path = os.path.join(DOWNLOAD_DIR, file)
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")