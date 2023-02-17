import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default function Episodes({ animeId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage, setEpisodesPerPage] = useState(13);

  const { data: episodes, error } = useSWR(`https://api.consumet.org/meta/anilist/episodes/${animeId}?provider=gogoanime`, fetcher);

  if (error) return <div>No Episodes</div>;
  if (!episodes) return <div>Loading...</div>;

  // Calculate the index of the first and last episodes to display on the current page
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;

  // Get the episodes to display on the current page
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

  // Render the episodes
  return (<>
    <div className="flex flex-row overflow-x-auto scrollbar-hide">
      {currentEpisodes.map((episode) => (
        <div key={episode.id} className="flex-shrink-0 flex-col items-center mx-4 w-48">
          <img src={episode.image} className="w-48" />
          <div className="font-semibold text-primary text-sm lg:text-md whitespace-pre-wrap line-clamp-2">
            Ep {episode.number} : {episode.title}
          </div>
        </div>
      ))}
      {/* Navigation buttons */}
      
    </div>

    <div className="flex-shrink-0 flex-col items-center mx-4">
        <div
          className={`flex items-center justify-center text-primary border-2  border-primary rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </div>
      </div>
      <div className="flex-shrink-0 flex-col items-center mx-4">
        <div
          className={`flex items-center justify-center text-primary border-2  border-primary rounded-md ${indexOfLastEpisode >= episodes.length ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastEpisode >= episodes.length}
        >
          Next Page
        </div>
      </div>
      </>
  );
}
