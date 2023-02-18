import Image from "next/image";

function AnimeCard({ animeImg, title }) {
  return (
    <div className="relative hover:border-2 border-red-500 duration-150 rounded-[0.5rem] bg-cover ease-in transition  transform z-10 min-w-[6.5rem] min-h-[10.25rem] max-w-[6.5rem] max-h-[10.25rem] lg:min-w-[12.5rem] lg:min-h-[18.75rem] bg-center bg-no-repeat whitespace-nowrap">
      <Image
        src={animeImg}
        alt={title}
        layout="fill"
        objectFit="cover"
        quality={100}
        className="rounded-[0.4rem]"
        style={{ objectFit: "cover", layout: "fill" }}
      />
      <div className="absolute align-bottom  text-clip m-2 px-2 lg:px-3 py-1  text-white bg-rose-500/40 backdrop-blur-md text-shadow-2xl text-[10px]  rounded-full whitespace-pre-wrap  ">
        2003
      </div>
      <div className="absolute -inset-1 bg-gradient-to-b from-transparent   to-black opacity-100 rounded-sm">
        <div className="absolute bottom-0  w-[95%] text-clip p-3  text-white text-shadow-2xl text-sm md:text-md lg:text-lg  whitespace-pre-wrap  ">
          {title}
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
