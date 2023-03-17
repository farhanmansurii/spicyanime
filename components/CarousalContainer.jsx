import Carousel from "nuka-carousel/lib/carousel";
import CarousalCard from "./Carousal";
export default function CarousalProducts(anime) {
  return (
    <>
      <>
        <div className=" w-full  mx-auto ">
          <Carousel
            wrapAround={true}
            autoplay={true}
            autoplayInterval={8000}
            defaultControlsConfig={{
              pagingDotsStyle: {
                fill: "none",
              },
            }}
            withoutControls
          >
            {anime.anime.map((anim, index) => (
              <CarousalCard props={anim} key={index} />
            ))}
          </Carousel>
        </div>
      </>
    </>
  );
}
