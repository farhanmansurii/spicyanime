import Image from "next/image";

export default function EpisodeCard({ episode }) {
  return (
    <div className="relative group">
      <Image
        src={episode.image}
        alt={`Episode ${episode.number}`}
        width={500}
        height={300}
        className="w-48  lg:w-full duration-150 cursor-pointer"
      />

      <div className="absolute text-sm flex-col-reverse flex font-medium text-left bottom-0 left-0 w-full py-1 bg-gradient-to-t from-black duration-150 h-full to-transparent bg-opacity-60 text-white lg:p-4  px-2 opacity-100  ">
        <div>
          <span className=" line-clamp-2 lg:text-lg">{episode.title}</span>
          <span className="uppercase font-semibold text-md lg:text-lg text-white/50 ">{`Episode ${episode.number} `}</span>
        </div>
      </div>
    </div>
  );
}
