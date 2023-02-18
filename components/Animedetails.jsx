const Animedetails = ({ deets }) => {
  return (
    <div
      style={{ backgroundImage: `url(${deets.image})` }}
      className="bg-cover bg-center lg:h-[350px] h-[400px] w-vw  bg-hidden lg:block lg:mx-auto"
    >
      <div className="bg-gradient-to-t from-[#0b090a]  flex flex-col-reverse min-h-[101%]  to-[#0b090a]/20 lg:to-[#0b090a]/20  lg: w-100">
        <div className="flex    w-[98%]  mx-auto gap-4 ">
          <div className="flex flex-col p-2  flex-0 ">
            <div className=" flex flex-row  flex-wrap  gap-4  w-full  ">
              <div className="flex text-primary text-4xl py-2 lg:text-5xl font-damion  line-clamp-2 ">
                {deets.title.userPreferred ||
                  deets.title.english ||
                  deets.title.romaji ||
                  ""}
              </div>
            </div>
            <div className="text-sm flex flex-wrap gap-2 py-2">
              <div className=" bg-rose-500/40 hover:bg-rose-500/30  rounded-full px-4 hover:scale-105 duration-150 w-fit py-1 ">
                {deets.rating} ⭐
              </div>
              <div className=" bg-rose-500/40 hover:bg-rose-500/30  rounded-full px-4 hover:scale-105 duration-150 w-fit py-1">
                {deets.releaseDate}
              </div>

              <div className=" bg-rose-500/40 hover:bg-rose-500/30  rounded-full px-4 hover:scale-105 duration-150   w-fit py-1 ">
                {deets.type}
              </div>
              <div className="  bg-rose-500/40 hover:bg-rose-500/30  rounded-full px-4 hover:scale-105 duration-150 w-fit py-1 capitalize">
                {deets.status}
              </div>
              <div className=" bg-rose-500/40 hover:bg-rose-500/30  rounded-full px-4 hover:scale-105 duration-150 w-fit py-1 ">
                {deets.totalEpisodes} Episodes
              </div>
            </div>
            <div className="text-sm flex gap-2 pb-2 flex-wrap">
              {deets.genres.slice(0, 3).map((genre) => (
                <div className=" bg-rose-500/40 hover:bg-rose-500/30  rounded-full px-4 hover:scale-105 duration-150 w-fit py-1 ">
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animedetails;
