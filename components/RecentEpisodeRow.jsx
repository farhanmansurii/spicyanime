import Link from "next/link";
import EpisodeCard from "./RecentEpisodeCard";

export default function RecentEpisodeRow({ recentlyreleased }) {
  console.log(recentlyreleased)
  return (
    <div className="w-11/12 gap mx-auto mb-10   ">
      <h2 className="text-2xl lg:text-3xl my-2 mx-2 ">Recently Released</h2>
      <div className="flex flex-col  overflow-x-scroll p-2 scrollbar-hide mx-auto ">
        <div className="flex gap-1 flex-nowrap ">
        {recentlyreleased?.results.map(
          (episode) =>
            episode.type === "TV" && (
              <Link
                href={`/${episode.id}`}
                key={episode.id}
                className=" flex-col items-center   duration-100"
              >
                <div key={episode.id}>
                  <div key={episode.id} className="episode-card flex-none relative  aspect-video h-[10rem] w-[16rem] rounded-lg   ">
                    <div className="overlay absolute rounded-lg inset-0 bg-[#111111]/50"></div>
                    <div className="episode-img-container rounded-lg w-full h-full overflow-hidden">
                      <img className="w-full h-full object-cover rounded-lg" src={episode.image} alt={`Episode ${episode.episode}`} />
                    </div>




                    <div className="episode-info absolute text-left bottom-2 w-full px-4 ">
                      {/* <div className="bg-[#e63946] w-fit px-4 py-1 rounded text-xs">filler</div> */}

                      <h3 className=" text-md lg:text-lg  line-clamp-1">E{episode.episodeNumber} : {episode.title.english}</h3>
                      <h3 className=" text-xs lg:text-md opacity-70 line-clamp-2">{episode.episodeTitle}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            )
        )}
        </div></div>
    </div>
  );
}
