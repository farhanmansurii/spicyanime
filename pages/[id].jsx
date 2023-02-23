import Animedetails from "@/components/Animedetails";
import Episodes from "@/components/Episodes";
import Navbar from "@/components/Navbar";
import Row from "@/components/Row";

export async function getServerSideProps(context) {
  const animeId = context.query.id;
  const detailsResponse = await fetch(
    `https://spicyapi.vercel.app/meta/anilist/data/${animeId}?provider=crunchyroll`
  );
  const details = await detailsResponse.json();
  return {
    props: {
      deets: details,
      animeId: animeId,
    },
  };
}
function filterRelationType(items) {
  return items?.filter((item) => item.type === "MOVIE" || item.type === "TV");
}
export default function AnimeDetails(deets) {
  const related = filterRelationType(deets.deets.relations);
  const notreleasedyet = deets.deets.status === "Not yet aired" ? true : false;
  return (
    <div className="pb-[7rem]">
      <Navbar />
      <div className=" flex-column  ">
        <Animedetails deets={deets.deets} />
      </div>
      {}
      {!notreleasedyet ? (
        <div className="my-4 w-11/12 mx-auto">
          <Episodes animeId={deets.animeId} type={deets.deets.type} />
        </div>
      ) : (
        <div className="my-4 w-11/12 mx-auto text-2xl justify-center text-center">
          No episodes
        </div>
      )}

      {related?.length > 0 && (
        <div className="my-10">
          <Row typeOfAnime={related} text="You might also like" />
        </div>
      )}
    </div>
  );
}
