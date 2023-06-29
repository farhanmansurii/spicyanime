function AnimeCard(props) {
  const { animeImg, title, releaseDate, relationType, type } = props
  return (
    <div class="relative w-36 h-52 lg:w-40 lg:h-60  duration-100  overflow-hidden  rounded">
      <img class="object-cover w-[100%] h-[99%]" src={animeImg} alt={title} />
      <div class="absolute inset-0  bg-gradient-to-t flex flex-col-reverse duration-150 hover:text-black hover:from-[#e63946] from-[#0b090a] to-transparent p-3">
        <p class=" text-sm bottom-0 lg:text-md   font-medium line-clamp-3">
          {title}
        </p>
        <p className="opacity-50 font-semibold text-xs ">
          <span className="uppercase">{type}</span>
          {relationType ? (
            <div className="">{" • "}
              {relationType.replace(/_/g, " ")}</div>
          ) : (
            <>
              {" • "}
              {releaseDate}
            </>
          )}
        </p>

      </div>
    </div>
  );
}

export default AnimeCard;
