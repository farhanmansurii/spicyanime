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
      console.log(foundAnime);
      if (foundAnime && foundAnime?.episode.id === episode.id)
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
          }),
          hls({ forceHLS: true }),
        ])
        .create();
    }
    var forward = document.createElement("button");
    forward.className = "forward";
    forward.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="3" stroke="#CACBD2" fill="none" class="duration-300 transform transition-all" style="width: 48px; height: 48px;"><path d="M23.93 41.41V23a.09.09 0 00-.16-.07s-2.58 3.69-4.17 4.78" stroke-linecap="round"></path><rect x="29.19" y="22.52" width="11.41" height="18.89" rx="5.7"></rect><path stroke-linecap="round" d="M54.43 15.41l-2.6 8.64-8.64-2.61M51.86 23.94a21.91 21.91 0 10.91 13.25"></path></svg>';

    forward.onclick = function () {
      playerRef.current.seek(playerRef.current.currentTime + 10);
    };

    var backward = document.createElement("button");
    backward.className = "backward";
    backward.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="3" stroke="#CACBD2" fill="none" class="duration-300 transform transition-all" style="width: 48px; height: 48px;"><path stroke-linecap="round" d="M9.57 15.41l2.6 8.64 8.64-2.61M26.93 41.41V23a.09.09 0 00-.16-.07s-2.58 3.69-4.17 4.78"></path><rect x="32.19" y="22.52" width="11.41" height="18.89" rx="5.7"></rect><path d="M12.14 23.94a21.91 21.91 0 11-.91 13.25" stroke-linecap="round"></path></svg>';

    backward.onclick = function () {
      playerRef.current.seek(playerRef.current.currentTime - 10);
    };
    playerRef.current.$root.appendChild(backward);
    playerRef.current.$root.appendChild(forward);
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
    playerRef.current.on("next", () => {
      handleNextEpisode(episode.id);
    });

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
            {watchTime > 0 && watchTime && (
              <button
                className="w-fit rounded-full text-sm px-2 py-2 bg-red-500 text-white"
                onClick={() => {
                  handleSeekToTime(watchTime);
                  setWatchTime(null);
                }}>
                begin where u left off ?
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
