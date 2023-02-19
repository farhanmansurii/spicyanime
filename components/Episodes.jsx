import axios from "axios";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import Sharingan from "../styles/sharingan.gif";
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

export default function Episodes({ animeId }) {
  const [episode, setEpisode] = useState(null);
  const [episodeError, setEpisodeError] = useState(null);
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
          `https://api.consumet.org/meta/anilist/watch/${selectedEpisode}`
        );
        setEpisode(response.data);
        setEpisodeError(null);
      } catch (error) {
        setEpisode(null);
        setEpisodeError(error);
      }
    };

    if (selectedEpisode) {
      fetchEpisode();
    }
  }, [selectedEpisode]);

  const getKey = (pageIndex, previousPageData) => {
    if (pageIndex === 0) {
      return `https://api.consumet.org/meta/anilist/episodes/${animeId}?provider=gogoanime`;
    }
    if (!previousPageData.length) {
      return null;
    }
    return `https://api.consumet.org/meta/anilist/episodes/${animeId}?provider=gogoanime`;
  };

  const { data, error } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
  });

  if (error) return <div>No Episodes</div>;
  if (!data)
    return (
      <div className=" h-[200px]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
        <img className="w-12" src={Sharingan} />
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

  return (
    <div className=" w-[99%] mx-auto text-center my-4  items-center">
      {selectedEpisode && (
        <div className="flex items-center ml-4   lg:text-2xl my-2 line-clamp-1">
          Episode {currentEpisode.number} : {currentEpisode.title}
        </div>
      )}
      {episode ? (
        <div className="flex items-center lg:h-[400px] flex-col">
          <Player sources={episode.sources} episode={episode} />
        </div>
      ) : (
        <div className=" lg:h-[400px]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
          <img className="w-12" src={Sharingan} />
        </div>
      )}
      {episodes.length > 1 && (
        <div className="my-4 w-[98%] mx-auto text-left text-xl">
          <label htmlFor="episodeRange" className="mr-2 font-semibold">
            Episodes
          </label>
          <select
            name="episodeRange"
            id="episodeRange"
            className="bg-rose-500/50 rounded-full px-3 outline-none  backdrop-blur-sm py-1 scrollbar-hide overflow-hidden"
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
      )}

      <div className="flex flex-row overflow-x-auto w-full scrollbar-hide">
        {visibleEpisodes.map((episode) => (
          <div
            key={episode.id}
            onClick={() => {
              setCurrentEpisode(episode);
              setSelectedEpisode("");
              setSelectedEpisode(episode.id);
              handleEpisodeClick(episode.id);
            }}
            className="flex-shrink-0 flex-col items-center mx-1 w-6/12 md:w-2/5 lg:w-1/4 xl:w-3/12  duration-100"
          >
            <EpisodeCard episode={episode} title={episode.title} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
