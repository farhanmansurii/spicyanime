const Animedetails = ({ deets }) => {
  return (
    <div
      style={{ backgroundImage: `url(${deets.image})` }}
      className="bg-cover bg-center lg:h-[350px] h-[450px] w-vw  bg-hidden lg:block lg:mx-auto"
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
            <div className="text-sm flex flex-wrap gap-2 pb-2">
              <div className="hover:scale-105 duration-150 w-fit py-1 ">
                {deets.rating} ⭐<span className="ml-2">•</span>
              </div>

              <div className="hover:scale-105 duration-150 w-fit py-1">
                {deets.releaseDate}
                <span className="ml-2">•</span>
              </div>

              <div className="hover:scale-105 duration-150   w-fit py-1 ">
                {deets.type}
                <span className="ml-2">•</span>
              </div>

              <div className=" hover:scale-105 duration-150 w-fit py-1 capitalize">
                {deets.status}
                <span className="ml-2">•</span>
              </div>

              <div className="hover:scale-105 duration-150 w-fit py-1 ">
                {deets.totalEpisodes} Episodes
              </div>
            </div>
            <div className="text-sm flex gap-2 pb-2 flex-wrap">
              {deets.genres.map((genre, index) => (
                <div
                  className="hover:scale-105 duration-150 w-fit py-1"
                  key={genre}
                >
                  {genre}
                  {index !== deets.genres.length - 1 && (
                    <span className="ml-2">•</span>
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
