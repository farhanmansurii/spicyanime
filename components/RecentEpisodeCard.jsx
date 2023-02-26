const EpisodeCard = ({ episode }) => {
  const imageUrl = episode.image;
  return (
    <div className="relative group overflow-hidden cursor-pointer transition-opacity duration-200 rounded-lg w-full h-0 pb-[56.25%] aspect-w-16 aspect-h-9">
      <div className="absolute inset-0 z-10 transition-all duration-300  group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b090a] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full  h-full px-4 py-2 flex flex-col justify-end">
          <p className="lg:text-lg text-md  font-semibold line-clamp-2 duration-150">
            {episode.title.english}
          </p>
          <h3 className=" text-xs lg:text-sm  opacity-70 line-clamp-1 ">
            Episode {episode.episodeNumber} :{episode.episodeTitle}
          </h3>
        </div>
      </div>
      <img
        className="object-cover object-center transition-all duration-100 transform group-hover:scale-[102%]"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={imageUrl}
        alt={`Episode ${episode.number}`}
      />
    </div>
  );
};

export default EpisodeCard;
