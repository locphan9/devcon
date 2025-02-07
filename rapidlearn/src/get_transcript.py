from youtube_transcript_api import YouTubeTranscriptApi

def generate_transcript(video_id):
    a = YouTubeTranscriptApi.get_transcript(video_id)
    if a:
        full_text = " ".join(entry['text'] for entry in a)
        return full_text
    else:
        return False
    