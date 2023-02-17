const Animedetails = ({ deets }) => {
  return (
    <div
      style={{ backgroundImage: `url(${deets.image})` }}
      className="bg-cover bg-center  w-vw  bg-hidden lg:block lg:mx-auto"
    >
      <div className="bg-gradient-to-t from-black  to-black/20 lg:to-black/20  lg:backdrop-blur-lg w-100">
        <div className="flex flex-col md:flex-row  items-center w-11/12  mx-auto gap-4 ">
          <div className="  my-5  mt-48 lg:mt-4 ">
            <div
              className="w-[149.33px] lg:w-[280.33px] bg-cover  hidden  md:block bg-no-repeat h-[233px] lg:h-[400px] shadow-2xl rounded-lg "
              style={{ backgroundImage: `url(${deets.image})` }}
            ></div>
          </div>

          <div className="flex flex-col p-2  flex-0">
            <div className=" flex flex-row sm:mt-10 flex-wrap  gap-4  w-full  ">
              <div className=" text-primary text-5xl ml-4 lg:text-6xl font-damion  ">
                {deets.title.english ||
                  deets.title.userPreferred ||
                  deets.title.romaji ||
                  ""}
              </div>
            </div>

            <div
              style={{ backgroundColor:  "#cc2936" }}
              className={`px-3  bg- rounded-2xl py-2 flex  lg:max-h-[10rem] max-h-[5rem] overflow-y-scroll scrollbar-hide flex-row m-1 mt-3 text-xs lg:text-lg    text-black text-shadow-xl   border-secondary/30 w-11/12 `}
            >
              <div>
                <div>Synopsis : ${deets.description}</div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap my-2">
              <div
                style={{ backgroundColor: "#cc2936" }}
                className="px-2 py-1   flex  text-sm lg:text-lg  rounded-2xl text-black  border-secondary/30 text-shadow-xl   w-fit"
              >
              </div>
              <div
                style={{ backgroundColor: "#cc2936" }}
                className="px-2 py-1   flex  text-sm lg:text-lg  rounded-2xl text-black  border-secondary/30 text-shadow-xl   w-fit"
              >
                Type : {deets.format}
              </div>
              <div
                style={{ backgroundColor: "#cc2936" }}
                className="px-2 py-1  capitalize flex  text-sm lg:text-lg  rounded-2xl text-black  border-secondary/30 text-shadow-xl   w-fit"
              >
                Status : <span className="lowercase">&nbsp;{deets.status}</span>
              </div>
              {deets.totalEpisodes !== null ? (
                <div
                  style={{
                    backgroundColor: "#cc2936",
                  }}
                  className="px-2 py-1  flex  text-sm lg:text-lg  rounded-2xl text-black   text-shadow-xl  border-secondary/30 w-fit"
                ></div>
              ) : (
                ""
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animedetails;
