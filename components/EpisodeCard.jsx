const EpisodeCard = ({ episode, isHovered, onMouseEnter, onMouseLeave }) => {
  const imageUrl = episode.image;

  return (
    <div
      className={`relative group overflow-hidden cursor-pointer ${
        isHovered ? "opacity-100" : "opacity-60"
      } transition-opacity duration-200`}
    >
      <div className="absolute inset-0 z-10 transition-all duration-300  group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full  h-full px-4 py-2 flex flex-col justify-end">
          <h3 className="text-lg font-bold text-white ">
            Episode {episode.number}
          </h3>
          <p className="text-sm text-white lg:opacity-0 group-hover:opacity-100 duration-150">
            {episode.title}
          </p>
        </div>
      </div>
      <img
        className="object-cover object-center  aspect-video transition-all duration-100 transform group-hover:scale-[102%]"
        src={imageUrl}
        alt={`Episode ${episode.number}`}
      />
    </div>
  );
};

export default EpisodeCard;
