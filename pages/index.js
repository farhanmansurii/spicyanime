import CarousalProducts from "@/components/CarousalContainer";
import Row from "@/components/Row";
import axios from "axios";
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
  return (
    <div>
      <div className="flex flex-col   pb-24 lg:pb-10">
        {popular && <CarousalProducts anime={popular?.results} />}
        <div className="my-10">
          <Row typeOfAnime={action?.results} text="Trending Anime" />
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
