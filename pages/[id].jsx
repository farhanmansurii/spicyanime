import Animedetails from "@/components/Animedetails";
import Episodes from "@/components/Episodes";
import Row from "@/components/Row";

export async function getServerSideProps(context) {
  const animeId = context.query.id;
  const detailsResponse = await fetch(
    `https://api.consumet.org/meta/anilist/info/${animeId}?provider=crunchyroll`
  );
  const details = await detailsResponse.json();

  return {
    props: {
      deets: details,
      animeId: animeId,
    },
  };
}
export default function AnimeDetails(deets) {
  console.log(deets.deets);
  return (
    <div>
      <div className=" flex-column  ">
        <Animedetails deets={deets.deets} />
      </div>
      <div className="border-rose-500 border-y-2">
        <Episodes animeId={deets.animeId} />
      </div>
      <div className="my-10">
        <Row typeOfAnime={deets.deets.relations} text="You might also like" />
      </div>
    </div>
  );
}
