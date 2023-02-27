const EpisodeCard = ({ episode }) => {
  const imageUrl = episode.image;

  return (
    <div className="relative group overflow-hidden cursor-pointer transition-opacity duration-200 rounded-lg w-full h-0 pb-[56.25%] aspect-w-16 aspect-h-9">
      <div className="absolute inset-0 z-10 transition-all duration-300  group-hover:opacity-100">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t group-hover:from-[#e63946] from-black to-transparent" />
        {episode.isFiller && (
          <div className="px-4 py-2 text-center bg-[#e63946]">filler</div>
        )}
        <div className="absolute bottom-0 left-0 group-hover:text-black w-full  h-full px-4 py-2 flex flex-col justify-end">
          <h3 className="text-lg font-semibold  ">Episode {episode.number}</h3>
          <p className="text-sm  opacity-70">{episode.title}</p>
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
