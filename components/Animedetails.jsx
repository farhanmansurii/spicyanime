const Animedetails = ({ deets }) => {
  return (
    <div
      style={{ backgroundImage: `url(${deets.image})` }}
      className="bg-cover bg-center lg:h-[400px] h-[450px]   bg-hidden lg:block lg:mx-auto"
    >
      <div className="bg-gradient-to-t from-[#0b090a]  flex flex-col-reverse min-h-[101%]  to-[#0b090a]/20 lg:to-[#0b090a]/20  lg: w-100">
        <div className="flex w-[96%]   lg:w-11/12 mx-auto gap-4 ">
          <div className="flex flex-col p-2  flex-0 ">
            <div className=" flex flex-row  flex-wrap  gap-4  w-full  ">
              <div className="flex text-primary text-5xl pt-2 lg:text-6xl my-5 font-damion  font-semibold line-clamp-3 ">
                {deets.title.userPreferred ||
                  deets.title.english ||
                  deets.title.romaji ||
                  ""}
              </div>
            </div>
            <div className="text-sm flex flex-wrap gap-2 pb-2">
              <div className="hover:scale-105 duration-150 w-fit py-1 ">
                {deets.rating} ⭐<span className="ml-2 text-[#e63946]">•</span>
              </div>

              <div className="hover:scale-105 duration-150 w-fit py-1">
                {deets.releaseDate}
                <span className="ml-2 text-[#e63946]">•</span>
              </div>

              <div className="hover:scale-105 duration-150   w-fit py-1 ">
                <span className="uppercase"> {deets.type}</span>
                <span className="ml-2 text-[#e63946]">•</span>
              </div>

              <div className=" hover:scale-105 duration-150 w-fit py-1 capitalize">
                {deets.status}
                {deets.type === "TV" && (
                  <span className="ml-2 text-[#e63946]">•</span>
                )}
              </div>
              {deets.type === "TV" && (
                <div className="hover:scale-105 duration-150 w-fit py-1 ">
                  {deets.totalEpisodes} Episodes
                </div>
              )}
            </div>
            <div className="text-sm flex gap-2 pb-2 flex-wrap">
              {deets.genres.map((genre, index) => (
                <div
                  className="hover:scale-105 duration-150 w-fit py-1"
                  key={genre}
                >
                  {genre}
                  {index !== deets.genres.length - 1 && (
                    <span className="ml-2 text-[#e63946]">•</span>
                  )}
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
