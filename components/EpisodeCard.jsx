import Image from "next/image";

export default function EpisodeCard({ episode }) {
  return (
    <div className="relative group">
      <Image
        src={episode.image}
        alt={`Episode ${episode.number}`}
        width={500}
        height={300}
        className="w-44  lg:w-full duration-150 cursor-pointer"
      />

      <div className="absolute text-sm flex-col-reverse flex font-medium text-left bottom-0 left-0 w-full py-1 bg-gradient-to-t from-black duration-150 h-full to-transparent bg-opacity-60 text-white lg:p-4  px-2 opacity-100 group-hover:from-red-500 ">
        <div>
          <span className="">{`Episode ${episode.number} `}</span>
          <span className=" line-clamp-1">{episode.title}</span>
        </div>
      </div>
    </div>
  );
}
