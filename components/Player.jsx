import { useState } from "react";
import ReactPlayer from "react-player";

const Player = ({ sources }) => {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [playedPercent, setPlayedPercent] = useState(0);
  const handleQualityChange = (url) => {
    setSelectedUrl(url);
  };

  return (
    <div className="lg:h-[400px]">
      <div className="gap-1 flex py-1  flex-wrap place-content-center items-center">
        {sources.map((video) => (
          <span
            key={video.url}
            onClick={() => handleQualityChange(video.url)}
            class={` ${
              selectedUrl === video.url ? "bg-red-500/50   " : "bg-red-500  "
            }

              "inline-block  text-white py-1 px-3 rounded-full text-xs opacity-90 transition-opacity hover:opacity-100"
            `}
          >
            {video.quality} {selectedUrl === video.url && <span>x</span>}
          </span>
        ))}
      </div>

      {selectedUrl && (
        <ReactPlayer
          url={selectedUrl}
          controls
          width={"100%"}
          className="react-player"
          wrapperClassName="red-skin"
          onProgress={(progress) => {
            const played = progress.played;
            const percent = played * 100;
            setPlayedPercent(percent);
          }}
        />
      )}
    </div>
  );
};

export default Player;
