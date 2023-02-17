import Animedetails from "@/components/Animedetails";
import Episodes from "@/components/Episodes";
import Row from "@/components/Row";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from ".";
export async function getServerSideProps(context) {
  const animeId = context.query.id;
  const detailsResponse = await fetch(`https://api.consumet.org/meta/anilist/info/${animeId}?provider=crunchyroll`);
  const details = await detailsResponse.json();



  return {
    props: {
      deets: details,
      animeId: animeId,
    }
  };
}
export default function AnimeDetails(deets) {
  
console.log(deets.deets)
  return (
    <div>
      <div className=" flex-column  ">
        <Animedetails deets={deets.deets} />
      </div>
      <div>
        <Episodes animeId ={deets.animeId}/>
      </div>
      <Row typeOfAnime={deets.deets.relations}/>
    </div>
  );
}
