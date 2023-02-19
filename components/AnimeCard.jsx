function AnimeCard({ animeImg, title, releaseDate }) {
  return (
    <div class="relative w-40 h-64 overflow-hidden shadow-lg rounded-lg">
      <img class="object-cover w-full h-full" src={animeImg} alt={title} />
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
        <p class="text-white text-lg font-semibold line-clamp-3">{title}</p>
        <p class="text-gray-400 text-sm">{releaseDate}</p>
      </div>
    </div>
  );
}

export default AnimeCard;
