import { useState } from "react";
import ReactPlayer from "react-player";

const Player = ({ sources }) => {
  const [selectedUrl, setSelectedUrl] = useState(
    sources.find((video) => video.quality === "default")?.url
  );
  const [playedPercent, setPlayedPercent] = useState(0);
  const handleQualityChange = (url) => {
    setSelectedUrl(url);
  };

  return (
    <div className="w-11/12">
      <div className="gap-1 flex py-1  flex-wrap place-content-center items-center">
        {sources.map((video) => (
          <span
            key={video.url}
            onClick={() => handleQualityChange(video.url)}
            class={` ${
              selectedUrl === video.url ? "bg-white/10   " : "bg-white/30  "
            }

              "inline-block  text-white py-1 px-3 text-xs opacity-90 transition-opacity hover:opacity-100"
            `}
          >
            {video.quality}
          </span>
        ))}
      </div>

      {selectedUrl && (
        <div className="  justify-center flex">
          <ReactPlayer
            url={selectedUrl}
            controls
            height="315px"
            onProgress={(progress) => {
              const played = progress.played;
              const percent = played * 100;
              setPlayedPercent(percent);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Player;
