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
