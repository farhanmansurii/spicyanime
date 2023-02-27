import { addEpisode } from "@/redux/reducers/recentlyWatchedReducers";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineNavigateNext, RxTrackNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {RxResume} from 'react-icons/rx'
import Spinner from "react-spinner-material";
import useSWRInfinite from "swr/infinite";
import EpisodeCard from "./EpisodeCard";
import Player from "./Player";
const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export default function Episodes({ animeId, type }) {
  const dispatch = useDispatch();
  const continueWatching = useSelector((state) => state.recentlyWatched.items);
  const [episode, setEpisode] = useState(null);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(25);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const handleEpisodeClick = (epid) => {
    setSelectedEpisode(epid);
  };
  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await axios.get(
          `https://spicyapi.vercel.app/meta/anilist/watch/${selectedEpisode}`
        );
        setEpisode(response.data);
      } catch (error) {
        setEpisode(null);
      }
    };

    if (selectedEpisode) {
      fetchEpisode();
    }
  }, [selectedEpisode]);
  useEffect(() => {
    setCurrentEpisode(null);
    setEpisode(null);
    setSelectedEpisode(null);
  }, [animeId]);

  const getKey = (pageIndex, previousPageData) => {
    if (pageIndex === 0) {
      return `https://spicyapi.vercel.app/meta/anilist/episodes/${animeId}?provider=gogoanime&fetchFiller=true`;
    }
    if (!previousPageData.length) {
      return null;
    }
    return `https://spicyapi.vercel.app/meta/anilist/episodes/${animeId}?provider=gogoanime&fetchFiller=true`;
  };

  const { data, error } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
  });

  if (error) return <div>No Episodes</div>;
  if (!data)
    return (
      <div className=" h-[200px]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
        <Spinner color="#e63946" />
      </div>
    );
  const episodes = data.flatMap((page) => page);
  if (!currentEpisode && data.length > 0 && data[0].length > 0) {
    setCurrentEpisode(data[0][0]);
    setSelectedEpisode(data[0][0].id);
  }
  const visibleEpisodes = episodes.slice(start - 1, end);
  const options = [];
  for (let i = 0; i < episodes.length; i += 25) {
    options.push(`${i + 1} - ${Math.min(i + 25, episodes.length)}`);
  }

  const handleNextEpisode = () => {
    if (currentEpisode.number < episodes.length)
      handleClickEpisode(episodes[currentEpisode.number]);
  };
  const handleClickEpisode = (episode) => {
    setEpisode("");
    setCurrentEpisode(episode);
    setSelectedEpisode(episode.id);
    handleEpisodeClick(episode.id);
    dispatch(addEpisode({ ...episode, animeId }));
  };
  return (
    <div className=" text-center my-4  items-center">
      {continueWatching.map(
        (e) =>
          e.animeId === animeId &&
          e.episode.number !== currentEpisode?.number && (
            <div
              onClick={() => handleClickEpisode(e.episode)}
              className="bg-[#e63946] border-4 border-black/50 text-black w-fit px-3  py-2 rounded-xl flex"
            >
              <RxResume className="my-auto mx-2" />
              Ep {e.episode.number} {e.episode.title}
            </div>
          )
      )}
      {selectedEpisode && type === "TV" && (
        <div className=" items-center flex gap-3   lg:text-3xl my-2 ">
          <div className=" ">
            Now Playing Episode {currentEpisode.number} : {currentEpisode.title}
          </div>
          {currentEpisode.number < episodes.length && (
            <div
              className="bg-[#e63946] border-4 border-black/50 text-black p-2 rounded-full "
              onClick={() => handleNextEpisode(episode)}
            >
              <MdOutlineNavigateNext className="lg:w-6 lg:h-6" />
            </div>
          )}
        </div>
      )}
      {episode ? (
        <div className="flex items-center  flex-col">
          <Player
            sources={episode.sources}
            episode={episode}
            key={episode.id}
          />
        </div>
      ) : (
        <div className=" h-[200px]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
          <Spinner color="#e63946" />
        </div>
      )}
      {episodes.length > 26 ? (
        <div className="my-4 w-[98%] mx-auto text-left text-xl">
          <label htmlFor="episodeRange" className="mr-2 font-semibold">
            Episodes
          </label>
          <select
            name="episodeRange"
            id="episodeRange"
            className="bg-[#e63946]  border-4 border-black/50 text-sm lg:text-lg rounded-full px-3 outline-none  text-black font-bold py-1 scrollbar-hide overflow-hidden"
            value={`${start} - ${end}`}
            onChange={(e) => {
              const [newStart, newEnd] = e.target.value.split(" - ");
              setStart(parseInt(newStart));
              setEnd(parseInt(newEnd));
            }}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        type === "TV" && (
          <div className="my-4 w-[98%] mx-auto text-left text-xl">
            <label htmlFor="episodeRange" className="mr-2 font-semibold">
              Episodes {visibleEpisodes.length}
            </label>
          </div>
        )
      )}

      <div className="flex flex-row overflow-x-auto w-full scrollbar-hide">
        {visibleEpisodes.map(
          (episode) =>
            type === "TV" && (
              <div
                key={episode.id}
                onClick={() => handleClickEpisode(episode)}
                className="flex-shrink-0 flex-col items-center mx-1 w-8/12 md:w-2/5 lg:w-1/4 xl:w-3/12  duration-100"
              >
                <EpisodeCard episode={episode} title={episode.title} />{" "}
              </div>
            )
        )}
      </div>
    </div>
  );
}
