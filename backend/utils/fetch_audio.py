import yt_dlp

def get_best_audio_url(youtube_url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'extract_audio': True,
        'audio-format': 'mp3',
        'noplaylist': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(youtube_url, download=False)
        return info_dict['url']  # Returns direct high-quality audio URL

# Example usage
url = get_best_audio_url("https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID")
print(url)  # This is the best-quality audio URL