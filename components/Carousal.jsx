const CarousalCard = (props) => {
  console.log(props.props.id, "carousal");
  return (
    <div className="w-full relative border-white h-[250px] lg:h-[350px]  ">
      <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-black to-transparent" />
      <div
        style={{
          backgroundImage: `url(${props.props.cover})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "full",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full"
      />
      <div className="z-50 flex gap-3 flex-col absolute w-11/12 mx-auto justify-end uppercase inset-0">
        <div className="mx-auto text-left text-3xl lg:text-5xl w-full">
          {props.props.title.english || props.props.title.userPreferred || ""}
        </div>
        <div className="capitalize w-2/3 text-white/50 ml-1 lg:w-6/12 text-[8px] lg:text-xs flex line-clamp-3">
          {props.props.description}
        </div>
        <div className="my-2 gap-2 flex">
          <button className="p-2 lg:p-3 text-xs flex bg-rose-500/30 backdrop-blur-sm hover:scale-110 hover:bg-rose-500 hover:text-black duration-150 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          </button>
          <button className="p-2 lg:p-3 text-xs bg-rose-500/30 backdrop-blur-sm hover:scale-110 hover:bg-rose-500 hover:text-black hover:rotate-180 duration-150 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarousalCard;
