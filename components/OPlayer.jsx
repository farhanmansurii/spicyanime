import {
  updateRecentlyWatched,
  updateWatchTime,
} from "@/redux/reducers/recentlyWatchedReducers";
import Player from "@oplayer/core";
import hls from "@oplayer/hls";
import ui from "@oplayer/ui";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OPlayer(props) {
  const { sources, animeId, episode, handleNextEpisode, recent } = props;
  const watchTimeTimeoutRef = useRef();
  const playerRef = useRef();
  const poster = episode.image;
  const isFullTitle = episode.title !== null && episode.title !== "full";
  const title = isFullTitle ? "E" + episode.number + " " + episode.title : "";
  const dispatch = useDispatch();
  const [initialWatchTimeFetched, setInitialWatchTimeFetched] = useState(false);
  const [watchTime, setWatchTime] = useState();
  const continueWatching = useSelector((state) => state.recentlyWatched.items);
  function takingAnimeId(animeId) {
    for (let i = 0; i < continueWatching.length; i++) {
      if (continueWatching[i].animeId === animeId) {
        return continueWatching[i];
      }
    }
  }

  useEffect(() => {
    if (!initialWatchTimeFetched) {
      const foundAnime = takingAnimeId(animeId);
      if (foundAnime && foundAnime.episode)
        setWatchTime(foundAnime?.episode?.watchTime);
      setInitialWatchTimeFetched(true);
    }
  }, []);
  useEffect(() => {
    // Create the player only once using the initial values
    if (!playerRef.current) {
      playerRef.current = Player.make("#oplayer", { poster, title })
        .use([
          ui({
            theme: {
              primaryColor: "#e63946",
            },
            preload: "auto",
            pictureInPicture: true,
            subtitle: { background: true, shadow: "none" },
            slideToSeek: "always",
            icons: {
              loadingIndicator: `
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-2 w-12 h-12"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            `,
              next: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-last"><polyline points="7 18 13 12 7 6"/><path d="M17 6v12"/></svg>`,
            },
            settings: [
              "loop",
              {
                name: "Quality",
                key: "KEY",
                type: "selector",
                icon: `<svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className='w-7 h-7'
              >
                <path d="M14.5 13.5h2v-3h-2M18 14a1 1 0 01-1 1h-.75v1.5h-1.5V15H14a1 1 0 01-1-1v-4a1 1 0 011-1h3a1 1 0 011 1m-7 5H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11m8-5H5c-1.11 0-2 .89-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>`,
                children: sources.map((source) => ({
                  name: source.quality,
                  value: source.url,
                  default: source.quality === "default",
                })),
                onChange({ value }) {
                  playerRef.current.changeQuality({
                    src: value,
                    poster,
                    title,
                  });
                },
              },
            ],
            topSetting: true,
            controlBar: true,
            // menu: [
            //   {
            //     name: "Next episode",
            //     icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-last"><polyline points="7 18 13 12 7 6"/><path d="M17 6v12"/></svg>`,
            //     onClick: () => {
            //       handleNextEpisode(episode.id);
            //     },
            //   },
            // ],
          }),
          hls({ forceHLS: true }),
        ])
        .create();
      var forward = document.createElement("button");
      forward.className = "forward";
      forward.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.444 3.685A10 10 0 0 1 18 4h-2v2h4a1 1 0 0 0 1-1V1h-2v1.253A12 12 0 1 0 24 12h-2A10 10 0 1 1 6.444 3.685ZM22 4v3h-3v2h4a1 1 0 0 0 1-1V4h-2Zm-9.398 11.576c.437.283.945.424 1.523.424s1.083-.141 1.513-.424c.437-.29.774-.694 1.009-1.215.235-.527.353-1.148.353-1.861 0-.707-.118-1.324-.353-1.851-.235-.527-.572-.932-1.009-1.215-.43-.29-.935-.434-1.513-.434-.578 0-1.086.145-1.523.434-.43.283-.764.688-.999 1.215-.235.527-.353 1.144-.353 1.851 0 .713.118 1.334.353 1.86.236.522.568.927.999 1.216Zm2.441-1.485c-.222.373-.528.56-.918.56s-.696-.187-.918-.56c-.222-.38-.333-.91-.333-1.591 0-.681.111-1.208.333-1.581.222-.38.528-.57.918-.57s.696.19.918.57c.222.373.333.9.333 1.581 0 .681-.111 1.212-.333 1.59Zm-6.439-3.375v5.14h1.594V9.018L7 9.82v1.321l1.604-.424Z" fill="currentColor"></path></svg>';
      forward.onclick = function () {
        playerRef.current.seek(playerRef.current.currentTime + 10);
      };

      var backward = document.createElement("button");
      backward.className = "backward";
      backward.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.02 2.048A10 10 0 1 1 2 12H0a12 12 0 1 0 5-9.747V1H3v4a1 1 0 0 0 1 1h4V4H6a10 10 0 0 1 5.02-1.952ZM2 4v3h3v2H1a1 1 0 0 1-1-1V4h2Zm12.125 12c-.578 0-1.086-.141-1.523-.424-.43-.29-.764-.694-.999-1.215-.235-.527-.353-1.148-.353-1.861 0-.707.118-1.324.353-1.851.236-.527.568-.932.999-1.215.437-.29.945-.434 1.523-.434s1.083.145 1.513.434c.437.283.774.688 1.009 1.215.235.527.353 1.144.353 1.851 0 .713-.118 1.334-.353 1.86-.235.522-.572.927-1.009 1.216-.43.283-.935.424-1.513.424Zm0-1.35c.39 0 .696-.186.918-.56.222-.378.333-.909.333-1.59s-.111-1.208-.333-1.581c-.222-.38-.528-.57-.918-.57s-.696.19-.918.57c-.222.373-.333.9-.333 1.581 0 .681.111 1.212.333 1.59.222.374.528.56.918.56Zm-5.521 1.205v-5.139L7 11.141V9.82l3.198-.8v6.835H8.604Z" fill="currentColor"></path></svg>';
      backward.onclick = function () {
        playerRef.current.seek(playerRef.current.currentTime - 10);
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once on initial render

  useEffect(() => {
    const handleTimeUpdate = () => {
      clearTimeout(watchTimeTimeoutRef.current); // Clear previous timeout (if any)

      watchTimeTimeoutRef.current = setTimeout(() => {
        const currentTime = playerRef.current.currentTime;
        const totalTime = playerRef.current.duration;
        const watchTimePercent = Math.floor((currentTime / totalTime) * 100);

        // Dispatch the updateWatchTime action only if the calculated watch time percentage is different from the watchTime prop

        dispatch(
          updateRecentlyWatched({ animeId, watchTime: watchTimePercent })
        );
      }, 300);
    };

    playerRef.current.on("timeupdate", handleTimeUpdate);

    // Clean up the event listener and timeout on component unmount
    return () => {
      playerRef.current.off("timeupdate", handleTimeUpdate);
      clearTimeout(watchTimeTimeoutRef.current);
    };
  }, [playerRef, dispatch, episode, animeId, watchTime]);

  useEffect(() => {
    // Update the player source and subtitles when sources change
    if (!playerRef.current) return;

    playerRef.current.changeSource({
      src: sources[sources.length - 1]?.url,
      poster,
      title,
    });

    // playerRef.current.$root.appendChild(backward);
    // playerRef.current.$root.appendChild(forward);

    playerRef.current.changeSource({
      src: sources[sources.length - 1]?.url,
      poster,
      title,
    });
  }, [sources, episode]);
  const handleSeekToTime = (percentage) => {
    const totalTime = playerRef.current.duration;
    const timeInSeconds = (percentage / 100) * totalTime;
    playerRef.current.seek(timeInSeconds);
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div key={episode.id} className="w-full my-5">
        {episode ? (
          <>
            {playerRef && playerRef?.current?.duration && watchTime && (
              <button
                className="w-fit px-2 py-2 bg-red-500 text-white"
                onClick={() => {
                  handleSeekToTime(watchTime);
                  setWatchTime(null);
                }}>
                Skip to{" "}
                {formatTime((watchTime / 100) * playerRef?.current.duration)}
              </button>
            )}
            <div className="justify-center flex">
              <div
                className="w-full h-full lg:w-[720px] aspect-video border-white/30"
                id="oplayer"
              />
            </div>
          </>
        ) : (
          <div className="w-full h-full lg:w-[720px] aspect-video border-white/30 flex items-center justify-center border mx-auto">
            Loading
          </div>
        )}
      </div>
    </>
  );
}
