import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Player = ({ sources, episode }) => {
  const [selectedUrl, setSelectedUrl] = useState(
    sources.find((video) => video.quality === "default")?.url
  );
  const [playedPercent, setPlayedPercent] = useState(0);

  const handleQualityChange = (url) => {
    setSelectedUrl(url);
  };

  useEffect(() => {
    setSelectedUrl(sources.find((video) => video.quality === "default")?.url);
    setPlayedPercent(0);
  }, [episode]);

  return (
    <div key={episode.id} className="w-full  border-rose-500">
      <div className="gap-1 flex py-1 flex-wrap place-content-center items-center">
        <select
          value={selectedUrl}
          onChange={(event) => handleQualityChange(event.target.value)}
          className="rounded-full px-4 py-1 bg-rose-500/40 hover:bg-rose-500/30 focus:outline-none focus:ring focus:ring-rose-500"
        >
          <option value="" disabled>
            Select quality
          </option>
          {sources
            .filter(
              (video, index, self) =>
                index === self.findIndex((v) => v.url === video.url)
            )
            .map((video) => (
              <option key={video.url} value={video.url}>
                {video.quality}
              </option>
            ))}
        </select>
      </div>

      {selectedUrl && (
        <div className="justify-center flex ">
          <div className="aspect-video ">
            <ReactPlayer
              url={selectedUrl}
              controls
              height={204}
              width={360}
              onProgress={(progress) => {
                const played = progress.played;
                const percent = played * 100;
                setPlayedPercent(percent);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
