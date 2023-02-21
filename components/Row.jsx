import Link from "next/link";
import AnimeCard from "./AnimeCard";
const Row = ({ typeOfAnime, text }) => {
  return (
    <div className="w-11/12 gap mx-auto mb-10   ">
      <h2 className="text-2xl lg:text-3xl my-2 mx-2 "> {text}</h2>
      <div className="  flex overflow-x-scroll relative z-10 p-2  space-x-1 ">
        {typeOfAnime?.map((e) => (
          <Link href={`/${e.id}`} key={e.id}>
            <AnimeCard
              key={e.id}
              animeImg={e.image || e.coverImage.large}
              title={e.title.english || e.title.userPreferred}
              id={e.id}
              type={e.type}
              relationType={e.relationType}
              releaseDate={e.releaseDate}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Row;
