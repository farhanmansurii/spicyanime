import Row from "@/components/Row";
import axios from "axios";
import useSWR, { SWRConfig } from "swr";

export const fetcher = (url) => axios.get(url).then((res) => res.data);


function Anime() {
  const { data: popular } = useSWR(
    "https://api.consumet.org/meta/anilist/popular",
    fetcher
  );
  const { data: action } = useSWR(
    "https://api.consumet.org/meta/anilist/trending",
    fetcher
  );

  return (
    <div>
      <div className="flex flex-col   pb-24 lg:pb-10">
        <Row typeOfAnime={action?.results} />
        <Row typeOfAnime={popular?.results} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function Home() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 600000, // refresh every 30 seconds
        fetcher,
        shouldRetryOnError: true, // don't retry on error
      }}
    >
      <Anime />
    </SWRConfig>
  );
}
