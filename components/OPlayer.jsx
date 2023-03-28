import Player from "@oplayer/core";
import hls from "@oplayer/hls";
import ui from "@oplayer/ui";
import { useEffect, useRef } from "react";

export default function OPlayer(props) {
  const { source, episode, handleNextEpisode } = props;
  const playerContainerRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current) return;
    playerRef.current = Player.make(playerContainerRef.current)
      .use([
        ui({
          theme: { primaryColor: "#e63946" },
          pictureInPicture: true,

          menu: [
            {
              name: "Next",
              icon: `  <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" className="hover:scale-110">
      <path
        fill="currentColor"
        d="M1.79 2.093A.5.5 0 001 2.5v10a.5.5 0 00.79.407l7-5a.5.5 0 000-.814l-7-5zM13 13h1V2h-1v11z"
      />
    </svg>
`,
              onClick: () => {
                handleNextEpisode(episode.id);
              },
            },

          ],

          slideToSeek: "always",
          controlBar: { back: "always" }, // | { back:  'always' | 'fullscreen' } // appbar
          topSetting: true,
          forceLandscapeOnFullscreen: true,

        }),
        hls(),
      ])
      .create();
  }, []);

  useEffect(() => {
    if (source)
    {
      playerRef.current.changeSource({
        title:
          episode.title !== "Full" &&
          `Episode ${episode?.number}  ${episode?.title}`,

        src: source,
        poster: episode.title !== "Full" && episode?.image,
      });
    }

    // listen
  }, [source, episode]);

  return (
    <div>
      <div className="w-full aspect-video  p-0 m-0 " ref={playerContainerRef} />
    </div>
  );
}
