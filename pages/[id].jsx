import Animedetails from "@/components/Animedetails";
import Row from "@/components/Row";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from ".";

export default function AnimeDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: deets, error: detailsError } = useSWR(
    `https://api.amvstr.ml/api/v2/info/${id}`,
    fetcher
  );

  const { data: related, error: relatedError } = useSWR(
    `https://api.amvstr.ml/api/v2/recommendations/${id}`,
    fetcher
  );

  if (!deets || !related) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className=" flex-column  ">
        <Animedetails deets={deets.data} />
      </div>
      <Row typeOfAnime={related.data} />
    </div>
  );
}
