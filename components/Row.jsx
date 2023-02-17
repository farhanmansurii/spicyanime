import Link from "next/link";
import AnimeCard from "./AnimeCard";
const Row = ({ typeOfAnime, text }) => {
  return (
    <div className="w-11/12 gap mx-auto mt-10   ">
      <h2 className="text-3xl my-2 mx-2 uppercase"> {text}</h2>
      <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-1 ">
        {typeOfAnime?.map((e) => (
          <Link href={`/${e.id}`} key={e.id}>
            <AnimeCard
              key={e.id}
              animeImg={e.image || e.coverImage.large}
              title={e.title.english || e.title.userPreferred}
              extratext={e.rating}
              id={e.id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Row;
