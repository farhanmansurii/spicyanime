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
          <div key={episode.id} className="flex-shrink-0 flex-col items-center mx-2 max-w-20">
          <div className="relative group">
            <Image
              src={episode.image}
              alt={`Episode ${episode.number}`}
              width={300}
              height={180}
              className="w-full cursor-pointer"
            />
           
  <div className="absolute text-left bottom-0 left-0 w-full py-1 bg-gradient-to-t from-black duration-150 to-transparent bg-opacity-60 text-white p-4 opacity-0 group-hover:opacity-100">
    Ep {episode.number} : {episode.title}
  </div>
          </div>
        </div>
        ))}
        {/* Load more button */}
        {size < 10 && (
          <div
            className="flex-shrink-0 flex-col items-center mx-4 cursor-pointer"
            onClick={() => setSize(size + 1)}
          >
            <div className="w-48 h-48 flex items-center justify-center text-primary border-2 border-dashed border-primary rounded-md">
              Load More
            </div>
          </div>
        )}
      </div>
    </div>)}
