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
    <div key={episode.id} className="w-full ">
      <div className="gap-1 flex py-1 flex-wrap place-content-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8.688c0-.864.933-1.4JUdGzvrMFDWrUUwY3toJATSeNwjn54LkCnKBPRzDuhzi5vSepHfUckJNxRL2gjkNrSqtCoRUrEDAgRwsQvVCjZbRyFTLRNyDmT1a1boZV864.933-1.4JUdGzvrMFDWrUUwY3toJATSeNwjn54LkCnKBPRzDuhzi5vSepHfUckJNxRL2gjkNrSqtCoRUrEDAgRwsQvVCjZbRyFTLRNyDmT1a1boZV"
          />
        </svg>
        <select
          value={selectedUrl}
          onChange={(event) => handleQualityChange(event.target.value)}
          className=" px-4 py-1 bg-transparent focus:outline-none focus:ring focus:ring-rose-500"
        >
          {sources
            .filter(
              (video, index, self) =>
                index === self.findIndex((v) => v.url === video.url)
            )
            .map((video) => (
              <option key={video.url} value={video.url} bg-black>
                {video.quality}
              </option>
            ))}
        </select>
      </div>

      {selectedUrl && episode ? (
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
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Player;
