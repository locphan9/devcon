// import { $Objects, $Actions, $Queries } from "@rapidlearn/sdk";
// import css from "./Home.module.css";
// import Layout from "./Layout";
import { useState } from "react";
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = "AIzaSyAqkVn6YFYzxCIHIO9wP6d_DlOvqJbWeWE"




const Home = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleSearch = async () => {
    const url = `${BASE_URL}?part=snippet&type=video&maxResults=5&q=${query}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSelectedVideo(null);
    setVideos(data.items);
  };

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search YouTube videos" />
      <button onClick={handleSearch}>Search</button>

      {selectedVideo ? (
        <iframe width="800" height="450" src={`https://www.youtube.com/embed/${selectedVideo}`} title="YouTube video" allowFullScreen />
      ) : (
        videos.map((video) => (
          <div key={video.id.videoId} onClick={() => setSelectedVideo(video.id.videoId)}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <p>{video.snippet.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;