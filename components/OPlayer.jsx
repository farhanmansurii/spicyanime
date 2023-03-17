import Player from "@oplayer/core";
import hls from "@oplayer/hls";
import ui from "@oplayer/ui";
import { useEffect, useRef } from "react";

export default function OPlayer(props) {
  const { source, episode } = props;
  console.log(episode);
  const playerContainerRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current) return;
    playerRef.current = Player.make(playerContainerRef.current)
      .use([
        ui({
          theme: { primaryColor: "#e63946" },
          pictureInPicture: true,
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
        title: `E${episode?.number} ${episode?.title}`,
        src: source,
        poster: episode?.image,
      });
    }
  }, [source, episode]);

  return (
    <div>
      <div className="w-full h-full p-0 m-0" ref={playerContainerRef} />
    </div>
  );
}