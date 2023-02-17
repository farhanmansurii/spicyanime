import axios from "axios";
import { useState } from "react";
import Spinner from "react-spinner-material";
import useSWR from "swr";
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

export default function Episodes({ animeId }) {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(25);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleEpisodeClick = (epid) => {
    setSelectedEpisode(epid);
  };

  const fetcherEp = async (url) => {
    const res = await fetch(url);
    return res.json();
  };

  const { data: episode, error: episodeError } = useSWR(
    selectedEpisode
      ? `https://api.consumet.org/meta/anilist/watch/${selectedEpisode}`
      : null,
    fetcherEp
  );
  console.log(episode);

  const getKey = (pageIndex, previousPageData) => {
    if (pageIndex === 0) {
      return `https://api.consumet.org/meta/anilist/episodes/${animeId}?provider=gogoanime`;
    }
    if (!previousPageData.length) {
      return null;
    }
    return `https://api.consumet.org/meta/anilist/episodes/${animeId}?provider=gogoanime`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (error) return <div>No Episodes</div>;
  if (!data)
    return (
      <div className=" h-[200px]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
        <Spinner radius={30} color="#DA0037" stroke={5} visible={true} />
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
    <div className=" w-11/12 mx-auto  my-4  items-center">
      {selectedEpisode && (
        <div className="flex items-center">
          Episode {currentEpisode.number} : {currentEpisode.title}
        </div>
      )}
      {episode ? (
        <div className="flex items-center lg:h-[400px] flex-col">
          <Player sources={episode.sources} />
        </div>
      ) : (
        <div className=" lg:h-[400px]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
          <Spinner radius={30} color="#DA0037" stroke={5} visible={true} />
        </div>
      )}
      {episodes.length > 1 && (
        <div className="my-4">
          <label htmlFor="episodeRange" className="mr-2 font-semibold">
            Episode range:
          </label>
          <select
            name="episodeRange"
            id="episodeRange"
            className="bg-black outline-none border-2 border-red-400 rounded-md px-2 py-1 scrollbar-hide overflow-hidden"
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

      <div className="flex flex-row overflow-x-auto scrollbar-hide">
        {visibleEpisodes.map((episode) => (
          <div
            key={episode.id}
            onClick={() => {
              setCurrentEpisode(episode),
                console.log(episode.id),
                handleEpisodeClick(episode.id);
            }}
            className="flex-shrink-0 flex-col items-center mx-1 sm:w-1/2 md:w-1/4 lg:w-1/5 max-w-20"
          >
            <EpisodeCard episode={episode} />
          </div>
        ))}
      </div>
    </div>
  );
}
