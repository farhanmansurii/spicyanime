import useSWRInfinite from 'swr/infinite';
import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default function Episodes({ animeId }) {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(13);

  const getKey = (pageIndex, previousPageData) => {
    // If there is no previous data, then fetch the first page
    if (pageIndex === 0) {
      return `https://api.consumet.org/meta/anilist/episodes/${animeId}?provider=gogoanime`;
    }
    // If the previous page did not return any data, then there are no more pages to fetch
    if (!previousPageData.length) {
      return null;
    }
    // Otherwise, fetch the next page
    return `https://api.consumet.org/meta/anilist/episodes/${animeId}?provider=gogoanime`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (error) return <div>No Episodes</div>;
  if (!data) return <div>Loading...</div>;

  // Concatenate all pages into a single array
  const episodes = data.flatMap((page) => page);

  const visibleEpisodes = episodes.slice(start - 1, end);

  const options = [];
  for (let i = 0; i < episodes.length; i += 13) {
    options.push(`${i + 1} - ${Math.min(i + 13, episodes.length)}`);
  }

  return (
    <div>
      <div className="my-4">
        <label htmlFor="episodeRange" className="mr-2 font-semibold">
          Episode range:
        </label>
        <select
          name="episodeRange"
          id="episodeRange"
          value={`${start} - ${end}`}
          onChange={(e) => {
            const [newStart, newEnd] = e.target.value.split(' - ');
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
      <div className="flex flex-row overflow-x-auto scrollbar-hide">
        {visibleEpisodes.map((episode) => (
          <div key={episode.id} className="flex-shrink-0 flex-col items-center mx-1 sm:w-1/2 md:w-1/4 lg:w-1/5 max-w-20">
          <div className="relative group">
            <Image
              src={episode.image}
              alt={`Episode ${episode.number}`}
              width={500}
              height={300}
              className="w-32 lg:w-full duration-150 cursor-pointer"
            />
        
            <div className="absolute text-left bottom-0 left-0 w-full py-1 bg-gradient-to-t from-black duration-150 to-transparent bg-opacity-60 text-white p-4 opacity-0 group-hover:opacity-100">
              <span className="block">{`Ep ${episode.number}`}</span>
              <span className="hidden sm:inline-block">{episode.title}</span>
            </div>
          </div>
        </div>
        
        ))}
        
        
      </div>
    </div>)
}
