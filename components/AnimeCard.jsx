
function AnimeCard(props) {
  const { animeImg, title, releaseDate, relationType, type } = props
  return (
    <div className="relative w-36 h-52 lg:w-40 lg:h-60 duration-100 overflow-hidden rounded">
      <img className="object-cover w-[100%] h-[99%]" src={animeImg} alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t flex flex-col-reverse duration-150  from-[#0b090a] to-transparent p-3">
        <p className="text-sm bottom-0 lg:text-md font-medium line-clamp-3">
          {title}
        </p>
        <p className="opacity-50 font-semibold text-xs">
          <span className="uppercase">{type}</span>
          {relationType ? (
            <div className="">{" • "}
              {relationType.replace(/_/g, " ")}
            </div>
          ) : (
            releaseDate ? (
              <>
                {" • "}
                {releaseDate}
                </>
              ) : ""
          )}
        </p>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity bg-black/20 duration-300 hover:opacity-100">
          <svg
            fill="#e63946"
            viewBox="0 0 16 16"
            className="w-12 h-12 bg-black rounded-full"
          >
            <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM6.79 5.093A.5.5 0 006 5.5v5a.5.5 0 00.79.407l3.5-2.5a.5.5 0 000-.814l-3.5-2.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
