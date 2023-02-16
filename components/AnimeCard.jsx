import Image from "next/image";

function AnimeCard({ animeImg, title }) {
  return (
    <div className="relative bg-cover ease-in transition duration-100 transform z-10 min-w-[6.5rem] min-h-[10.25rem] max-w-[6.5rem] max-h-[10.25rem] lg:min-w-[12.5rem] lg:min-h-[18.75rem] bg-center bg-no-repeat whitespace-nowrap">
      <Image
        src={animeImg}
        alt={title}
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{ objectFit: "cover", layout: "fill" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-white text-shadow-lg text-sm md:text-md lg:text-lg truncate line-clamp-2">
        {title}
      </div>
    </div>
  );
}

export default AnimeCard;
