import Carousel from "nuka-carousel/lib/carousel";
import CarousalCard from "./Carousal";
export default function CarousalProducts(anime) {
  console.log(anime.anime, "anime");
  return (
    <>
      <>
        <div className=" w-full  mx-auto ">
          <Carousel
            wrapAround={true}
            defaultControlsConfig={{
              pagingDotsStyle: {
                fill: "none",
              },
            }}
            withoutControls
            renderTopLeftControls={({ nextSlide }) => (
              <button
                onClick={() => nextSlide()}
                className="  btn-ghost text-white     hover:bg-transparent hover:text-black duration-300 m-2"
              >
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          >
            {anime.anime.slice(0, 4).map((anim) => (
              <CarousalCard props={anim} />
            ))}
          </Carousel>
        </div>
      </>
    </>
  );
}
