import Carousel from "nuka-carousel/lib/carousel";
import CarousalCard from "./Carousal";
export default function CarousalProducts(anime) {
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
            {anime.anime.slice(0, 4).map((anim, index) => (
              <CarousalCard props={anim} key={index} />
            ))}
          </Carousel>
        </div>
      </>
    </>
  );
}
