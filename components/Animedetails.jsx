const Animedetails = ({ deets }) => {
  return (
    <div
      style={{ backgroundImage: `url(${deets.cover})` }}
      className="bg-cover bg-center lg:h-[350px] h-[400px] w-vw  bg-hidden lg:block lg:mx-auto"
    >
      <div className="bg-gradient-to-t from-[#0b090a]  flex flex-col-reverse min-h-[101%]  to-[#0b090a]/20 lg:to-[#0b090a]/20  lg:backdrop-blur-sm w-100">
        <div className="flex    w-[98%]  mx-auto gap-4 ">
          <div className="flex flex-col p-2  flex-0 ">
            <div className=" flex flex-row  flex-wrap  gap-4  w-full  ">
              <div className="flex text-primary text-5xl uppercase lg:text-6xl font-damion  ">
                {deets.title.userPreferred ||
                  deets.title.english ||
                  deets.title.romaji ||
                  ""}
                <span className="m-auto  pl-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-10  p-2 bg-white/20 rounded-full block"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="text-sm flex gap-2 py-2">
              <div className="backdrop-blur-sm bg-white/10 hover:bg-white/30 hover:scale-105 duration-150 w-fit p-2 ">
                {deets.rating} ⭐
              </div>
              <div className="backdrop-blur-sm bg-white/10 hover:bg-white/30 hover:scale-105 duration-150 w-fit p-2">
                {deets.releaseDate}
              </div>

              <div className="backdrop-blur-sm bg-white/10 hover:bg-white/30 hover:scale-105 duration-150   w-fit p-2 ">
                {deets.type}
              </div>
              <div className=" backdrop-blur-sm bg-white/10 hover:bg-white/30 hover:scale-105 duration-150 w-fit p-2 capitalize">
                {deets.status}
              </div>
              <div className="backdrop-blur-sm bg-white/10 hover:bg-white/30 hover:scale-105 duration-150 w-fit p-2 ">
                {deets.totalEpisodes} Episodes
              </div>
            </div>
            <div className="text-sm flex gap-2 pb-2">
              {deets.genres.map((genre) => (
                <div className="backdrop-blur-sm bg-white/10 hover:bg-white/30 hover:scale-105 duration-150 w-fit p-2 ">
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
