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
    <div className="w-full border-b-2 border-rose-500">
      <div className="gap-1 flex py-1  flex-wrap place-content-center items-center">
        {sources.map((video) => (
          <span
            key={video.url}
            onClick={() => handleQualityChange(video.url)}
            class={` ${
              selectedUrl === video.url
                ? "bg-rose-500/80   "
                : "bg-rose-500/40  "
            }

                hover:bg-rose-500/30  rounded-full px-4 hover:scale-105 duration-150 w-fit py-1  `}
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
