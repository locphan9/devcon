// import { $Objects, $Actions, $Queries } from "@rapidlearn/sdk";

import { useState } from "react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const Home = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");

  const handleSearch = async () => {
    const url = `${BASE_URL}?part=snippet&type=video&maxResults=5&q=${query}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSelectedVideo(null);
    setVideos(data.items);
  };

  const fetchTranscript = async (videoId: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/transcript?video_id=${videoId}`);
      const data = await response.json();
      if (response.ok) {
        setTranscript(data.transcript);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search YouTube videos" 
      />
      <button onClick={handleSearch}>Search</button>

      {/* Video Player */}
      {selectedVideo ? (
        <div>
          <iframe 
            width="800" 
            height="450" 
            src={`https://www.youtube.com/embed/${selectedVideo}`} 
            title="YouTube video" 
            allowFullScreen 
          />
          {/* Transcript Display */}
          {transcript && (
            <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
              <h3>Transcript:</h3>
              <p>{transcript}</p>
            </div>
          )}
        </div>
      ) : (
        // Video List
        videos.map((video) => (
          <div 
            key={video.id.videoId} 
            onClick={() => {
              setSelectedVideo(video.id.videoId);
              fetchTranscript(video.id.videoId);  // Fetch transcript on click
            }}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <p>{video.snippet.title}</p>
            <p>{video.id.videoId}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
