import Link from "next/link";
import EpisodeCard from "./RecentEpisodeCard";

export default function RecentEpisodeRow({ recentlyreleased }) {
  return (
    <div className="w-11/12 gap mx-auto mb-10   ">
      <h2 className="text-2xl lg:text-3xl my-2 mx-2 ">Recently Released</h2>
      <div className="flex flex-row overflow-x-auto scrollbar-hide">
        {recentlyreleased?.results.map(
          (episode) =>
            episode.type === "TV" && (
              <Link
                href={`/${episode.id}`}
                key={episode.id}
                className="flex-shrink-0 flex-col items-center mx-1 aspect-video  h-[113px] w-[200px] lg:h-full lg:w-1/4 xl:w-3/12  duration-100"
              >
                <div key={episode.id}>
                  <EpisodeCard episode={episode} />
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}
