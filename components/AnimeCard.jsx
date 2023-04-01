function AnimeCard(props) {
  const { animeImg, title, releaseDate, relationType, type } = props
  return (
    <div class="relative w-32 h-52 lg:w-36 lg:h-60  duration-100  overflow-hidden  rounded-lg">
      <img class="object-cover w-full h-full" src={animeImg} alt={title} />
      <div class="absolute inset-0 -bottom-1 bg-gradient-to-t flex flex-col-reverse duration-150 hover:text-black hover:from-[#e63946] from-[#0b090a] to-transparent p-3 lg:p-4">
        <p class=" opacity-50 font-semibold text-xs lg:text-sm lowercase ">
          <span className="capitalize"> {type}</span> •{" "}
          {releaseDate || relationType}
        </p>
        <p class=" text-md bottom-0 lg:text-lg   font-medium line-clamp-3">
          {title}
        </p>
      </div>
    </div>
  );
}

export default AnimeCard;
