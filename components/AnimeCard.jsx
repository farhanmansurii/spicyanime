function AnimeCard({ animeImg, title, releaseDate }) {
  return (
    <div class="relative w-32 h-52 lg:w-36 lg:h-60  overflow-hidden  rounded-lg">
      <img class="object-cover w-full h-full" src={animeImg} alt={title} />
      <div class="absolute inset-x-0 -bottom-1 bg-gradient-to-t from-black to-transparent p-4">
        <p class="text-white text-md lg:text-lg font-semibold line-clamp-3">
          {title}
        </p>
        <p class="text-gray-400 text-sm">{releaseDate}</p>
      </div>
    </div>
  );
}

export default AnimeCard;
