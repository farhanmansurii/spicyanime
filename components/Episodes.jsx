import { addEpisode } from "@/redux/reducers/recentlyWatchedReducers";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-spinner-material";
import useSWRInfinite from "swr/infinite";
import EpisodeCard from "./EpisodeCard";
import Player from "./Player";
import OPlayer from "./OPlayer";
const fetcher = async (url) => {
  try
  {
    const response = await axios.get(url);
    return response.data;
  } catch (error)
  {
    throw new Error("Failed to fetch data");
  }
};

export default function Episodes({ animeId, type, totalEpisodes }) {
  const dispatch = useDispatch();
  const continueWatching = useSelector((state) => state.recentlyWatched.items);
  const [episode, setEpisode] = useState(null);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(26);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const handleEpisodeClick = (epid) => {
    setSelectedEpisode(epid);
  };
  useEffect(() => {
    const fetchEpisode = async () => {
      try
      {

        const response = await axios.get(
          `https://spicyapi.vercel.app/meta/anilist/watch/${selectedEpisode}`
        );
        setEpisode(response.data);
      } catch (error)
      {
        setEpisode(null);
      }
    };

    if (selectedEpisode)
    {
      fetchEpisode();
    }
  }, [selectedEpisode]);
  useEffect(() => {
    setCurrentEpisode(null);
    setEpisode(null);
    setSelectedEpisode(null);
  }, [animeId]);

  const getKey = (pageIndex, previousPageData) => {
    if (pageIndex === 0)
    {
      return `https://spicyapi.vercel.app/meta/anilist/episodes/${animeId}?provider=gogoanime&fetchFiller=true`;
    }
    if (!previousPageData.length)
    {
      return null;
    }
    return `https://spicyapi.vercel.app/meta/anilist/episodes/${animeId}?provider=gogoanime&fetchFiller=true`;
  };

  const { data, error } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
  });

  if (error)
    return (
      <div className=" h-[200px] text-2xl  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
        {error.message} 
      </div>
    );
  if (!data)
    return (
      <div className=" h-[200px]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
        <Spinner color="#e63946" />
      </div>
    );


  const episodes = data.flatMap((page) => page).sort((a, b) => a.number - b.number);


  function ifExists(animeId) {

    for (let i = 0; i < continueWatching.length; i++)
    {
      if (continueWatching[i].animeId === animeId) return true
      return false

    }
  }


  function takingAnimeId(animeId) {
    for (let i = 0; i < continueWatching.length; i++)
    {
      if (continueWatching[i].animeId === animeId)
      {
        return continueWatching[i];
      }
    }
  }

  const foundAnime = takingAnimeId(animeId);
  if (!currentEpisode && episodes.length > 0)
  {
    if (ifExists(animeId))
    {
      console.log('exists');
      setCurrentEpisode(foundAnime.episode);
      setSelectedEpisode(foundAnime.episode.id);
    } else
    {
      console.log('does not exist');
      setCurrentEpisode(episodes[0]);
      setSelectedEpisode(episodes[0].id);
    }
  }




  const visibleEpisodes = episodes.slice(start - 1, end);
  const options = [];
  for (let i = 0; i < episodes.length; i += 26)
  {
    options.push(`${i + 1} - ${Math.min(i + 26, episodes.length)}`);
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
              className=" border-black/50 text-black bg-[#e63946] w-fit px-3  py-2 rounded-xl flex"
            >
              Continue E{e.episode.number} {e.episode.title} ?
            </div>
          )
      )}
      {(type === "TV" || type === "ONA") && selectedEpisode && (
        <div className="text-left flex gap-3 justify-between lg:text-3xl my-2">
          <div className="inline line-clamp-2 my-auto gap-2 flex-nowrap">
            <span className="text-[#e63946] inline-flex flex-wrap font-semibold">
              Now Playing E{currentEpisode.number}
            </span>{" "}
            {currentEpisode.title}
          </div>

        </div>
      )}
      {episode ? (
        <div className="flex items-center flex-col">
          <OPlayer
            sources={episode.sources}
            episode={currentEpisode}
            handleNextEpisode={handleNextEpisode}
            key={episode.id}
            animeId={animeId}
          />
        </div>
      ) : (
        <div className="h-[200px] w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
          <Spinner color="#e63946" />
        </div>
      )}
      {episodes.length >= 27 ? (
        <div className="my-4 w-[98%] mx-auto text-left text-xl">
          <label htmlFor="episodeRange" className="mr-2 font-semibold">
            Episode Range
          </label>
          <select
            name="episodeRange"
            id="episodeRange"
            className="bg-[#e63946]  border-4 p-3 border-black/50 text-sm lg:text-lg rounded-lg px-3 outline-none  text-black font-semibold py-1 scrollbar-hide overflow-hidden"
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
              Episodes {visibleEpisodes.length}/{totalEpisodes}
            </label>
          </div>
        )
      )}

      <div className="flex flex-col  overflow-x-scroll p-2 scrollbar-hide mx-auto ">
        <div className="flex gap-1 flex-nowrap ">
        {visibleEpisodes.map((ep) => (
          (type === "TV" || type === "ONA") && (

            <div
              key={ep.id}
              onClick={() => handleClickEpisode(ep)}
              className={`rounded-lg ${selectedEpisode && (ep.id === selectedEpisode ? 'border-2 border-red-500' : ' border-transparent')
                }`}
            >
              <EpisodeCard episode={ep} title={ep.title} />
            </div>

          )
        ))}
        </div></div>
    </div>
  );
}
