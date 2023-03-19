import Player from "@oplayer/core";
import hls from "@oplayer/hls";
import ui from "@oplayer/ui";
import { useEffect, useRef } from "react";

export default function OPlayer(props) {
  const { source, episode, handleNextEpisode } = props;
  console.log(episode);
  const playerContainerRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current) return;
    playerRef.current = Player.make(playerContainerRef.current)
      .use([
        ui({
          theme: { primaryColor: "#e63946", accent: "#e63946" },
          pictureInPicture: true,
          menu: [
            {
              name: "Next",
              icon: ` <svg
      viewBox="0 0 24 24"
      fill="primaryColor"
   classname='w-6 h-6'
    >
      <path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2M8 8l5 4-5 4m6-8h2v8h-2" />
    </svg>`,
              onClick: () => {
                handleNextEpisode(episode.id);
                console.log(episode.id);
              },
            },
          ],
          slideToSeek: "long-touch",
          controlBar: { back: "always" }, // | { back:  'always' | 'fullscreen' } // appbar
          topSetting: true,
          forceLandscapeOnFullscreen: true,
        }),
        hls(),
      ])
      .create();
  }, []);

  useEffect(() => {
    if (source) {
      playerRef.current.changeSource({
        title:
          episode.title !== "Full" &&
          `Episode ${episode?.number}  ${episode?.title}`,

        src: source,
        poster: episode.title !== "Full" && episode?.image,
      });
    }
  }, [source, episode]);

  return (
    <div>
      <div className="w-full aspect-video  p-0 m-0 " ref={playerContainerRef} />
    </div>
  );
}
