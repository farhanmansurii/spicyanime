const EpisodeCard = ({ episode }) => {


  return (
    <div key={episode.id} className="episode-card flex-none relative w-[16rem] h-[10rem] rounded-lg   ">
      <div className="overlay absolute rounded-lg inset-0 bg-[#111111]/70 hover:bg-[#111111]/50"></div>
      <div className="episode-img-container rounded-lg w-full h-full overflow-hidden">
        <img className="w-full h-full object-cover rounded-lg" src={episode.image} alt={`Episode ${episode.episode}`} />
      </div>




      <div className="episode-info absolute text-left bottom-2 w-full px-4 ">
        {/* <div className="bg-[#e63946] w-fit px-4 py-1 rounded text-xs">filler</div> */}

        <h3 className=" text-md lg:text-lg  line-clamp-1">{episode.title ? 'E' : "Episode "}{episode.number}  {episode.title && ": " + episode.title}</h3>
        <h3 className=" text-xs lg:text-md opacity-70 line-clamp-2">{episode.description}</h3>
      </div>
    </div>
  );
};

export default EpisodeCard;
