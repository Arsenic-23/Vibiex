import yt_dlp

def get_best_audio_url(youtube_url):
    """
    Fetches the highest quality audio URL from a YouTube video.
    """
    ydl_opts = {
        'format': 'bestaudio/best',
        'extract_audio': True,
        'audio-format': 'mp3',
        'noplaylist': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(youtube_url, download=False)
            return info_dict['url']  # Returns direct high-quality audio URL
    except Exception as e:
        print(f"Error fetching audio: {e}")
        return None

# Example usage
if __name__ == "__main__":
    test_url = "https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID"
    audio_link = get_best_audio_url(test_url)
    print("Best Audio URL:", audio_link)