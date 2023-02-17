import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Player = ({ sources, subtitles }) => {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [skipIntro, setSkipIntro] = useState(false);

  const handleProgress = (progress) => {
    setProgress(Math.round(progress.playedSeconds));
  };

  const handleQualityChange = (url) => {
    setSelectedUrl(url);
  };

  useEffect(() => {
    const defaultVideo = sources.find((video) => video.quality === "auto");
    if (defaultVideo) {
      setSelectedUrl(defaultVideo.url);
    }
  }, []);

  return (
    <div>
      <div className="gap-1 flex py-1  flex-wrap place-content-center">
        {sources.map((video) => (
          <button
            onClick={() => handleQualityChange(video.url)}
            key={video.url}
            className={`${
              selectedUrl === video.url
                ? "bg-secondary-focus text-primary border-2 border-primary"
                : "bg-secondary text-primary"
            }  rounded-full  px-3 py-2  text-xs`}
          >
            {video.quality}
          </button>
        ))}
      </div>
      {selectedUrl && (
        <ReactPlayer
          url={selectedUrl}
          controls
          width={"100%"}
          height={"100%"}
          onProgress={handleProgress}
          config={{
            file: {
              tracks: subtitles.map((subtitle) => ({
                kind: "subtitles",
                src: subtitle.url,
                srcLang: subtitle.lang,
                default: subtitle.lang === "English", // Set the 'default' property to 'true' only for the English subtitle
              })),
            },
            attributes: {
              crossOrigin: "true",
            },
          }}
          playedSeconds={skipIntro ? 30 : 0}
        />
      )}
      <div>
        <label htmlFor="skipIntro">Skip intro</label>
        <input
          type="checkbox"
          id="skipIntro"
          onChange={(e) => setSkipIntro(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default Player;
