import CarousalProducts from "@/components/CarousalContainer";
import RecentEpisodeCard from "@/components/RecentEpisodeCard";
import Row from "@/components/Row";
import axios from "axios";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";

export const fetcher = (url) => axios.get(url).then((res) => res.data);

function Anime() {
  const { data: popular, isLoading: popularIsLoading } = useSWR(
    "https://api.consumet.org/meta/anilist/popular",
    fetcher
  );
  const { data: action, isLoading: actionIsLoading } = useSWR(
    "https://api.consumet.org/meta/anilist/trending",
    fetcher
  );
  const { data: recentlyreleased } = useSWR(
    "https://api.consumet.org/meta/anilist/recent-episodes?page=1&perPage=10",
    fetcher
  );
  console.log(recentlyreleased, "episodes");
  return (
    <div>
      <div className="flex flex-col   pb-24 lg:pb-10">
        {popular && <CarousalProducts anime={popular?.results} />}
        <div className="my-10">
          <Row typeOfAnime={action?.results} text="Trending Anime" />
          <div className="w-11/12 gap mx-auto mb-10   ">
            <h2 className="text-2xl lg:text-3xl my-2 mx-2 ">
              Recently Released
            </h2>
            <div className="flex flex-row overflow-x-auto scrollbar-hide">
              {recentlyreleased?.results.map(
                (episode) =>
                  episode.type === "TV" && (
                    <Link
                      href={`/${episode.id}`}
                      key={episode.id}
                      className="flex-shrink-0 flex-col items-center mx-1 w-8/12 md:w-2/5 lg:w-1/4 duration-100"
                    >
                      <div key={episode.id}>
                        <RecentEpisodeCard episode={episode} />
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
          <Row typeOfAnime={popular?.results} text="Popular Anime" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 600000,
        fetcher,
        shouldRetryOnError: true,
      }}
    >
      <Anime />
    </SWRConfig>
  );
}
