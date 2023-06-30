const Animedetails = ({ deets }) => {
  return (
    <>

      <div
        style={{ backgroundImage: `url(${deets.cover})` }}
        className="bg-cover bg-center hidden  lg:h-[500px] h-[350px]   bg-hidden lg:block lg:mx-auto"
      >
        <div className="bg-gradient-to-t from-[#0b090a]  flex flex-col-reverse min-h-[101%]  to-[#0b090a]/20 lg:to-[#0b090a]/20  lg: w-100">
          <div className="flex w-[96%]   lg:w-11/12 mx-auto gap-4 ">
            <div className="flex flex-col p-2  flex-0 ">
              <div className=" flex flex-row  flex-wrap  gap-4  w-full  ">
                <div className="flex text-primary text-3xl pt-2 lg:text-5xl my-2 font-damion  font-semibold line-clamp-3 ">
                  {deets.title.userPreferred ||
                    deets.title.english ||
                    deets.title.romaji ||
                    ""}
                </div>
              </div>
              <div className="text-sm flex flex-wrap gap-2 pb-2">
                <div
                  className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"

                >  {deets.rating} ⭐
                </div>

                <div className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
                >
                  {deets.releaseDate}

                </div>

                <div className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
                >
                  <span className="uppercase"> {deets.type}</span>

                </div>

                <div className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
                >
                  {deets.status}

                </div>
                {deets.type === "TV" && (
                  <div className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
                  >
                    {deets.totalEpisodes} Episodes
                  </div>
                )}
              </div>
              <div className="text-sm flex gap-2 pb-1 flex-wrap">
                {deets.genres.slice(0, 4).map((genre, index) => (
                  <div
                    className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
                    key={index}
                  >
                    {genre}
                    {/* {index !== deets.genres.length - 1 && (
                    
                  )} */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    <div
      style={{ backgroundImage: `url(${deets.image})` }}
        className="bg-cover bg-center md:hidden lg:h-[500px] h-[350px]   bg-hidden  lg:mx-auto"
    >
      <div className="bg-gradient-to-t from-[#0b090a]  flex flex-col-reverse min-h-[101%]  to-[#0b090a]/20 lg:to-[#0b090a]/20  lg: w-100">
        <div className="flex w-[96%]   lg:w-11/12 mx-auto gap-4 ">
          <div className="flex flex-col p-2  flex-0 ">
            <div className=" flex flex-row  flex-wrap  gap-4  w-full  ">
                <div className="flex text-primary text-3xl pt-2 lg:text-5xl my-2 font-damion  font-semibold line-clamp-3 ">
                {deets.title.userPreferred ||
                  deets.title.english ||
                  deets.title.romaji ||
                  ""}
              </div>
            </div>
            <div className="text-sm flex flex-wrap gap-2 pb-2">
              <div
                className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"

              >  {deets.rating} ⭐
              </div>

              <div className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
              >
                {deets.releaseDate}

              </div>

              <div className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
              >
                <span className="uppercase"> {deets.type}</span>

              </div>

              <div className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
              >
                {deets.status}

              </div>
              {deets.type === "TV" && (
                <div className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
                >
                  {deets.totalEpisodes} Episodes
                </div>
              )}
            </div>
            <div className="text-sm flex gap-2 pb-1 flex-wrap">
              {deets.genres.slice(0, 4).map((genre, index) => (
                <div
                  className="hover:scale-105 duration-150 w-fit py-1 px-3 backdrop-blur-sm bg-red-500/10 rounded-full"
                  key={index}
                >
                  {genre}
                  {/* {index !== deets.genres.length - 1 && (
                    
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>



    </>
  );
};

export default Animedetails;
