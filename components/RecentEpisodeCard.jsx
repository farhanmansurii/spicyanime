const EpisodeCard = ({ episode }) => {
  const imageUrl = episode.image;
  return (



    <div key={episode.id} className="episode-card flex-none relative w-64 h-40 rounded-lg   ">

      <div className="overlay absolute inset-0 bg-black opacity-50 rounded"></div>
      <div className="episode-img-container w-full h-full rounded overflow-hidden">
        <img className="w-full h-full object-cover" src={imageUrl} alt={`Episode Image`} />
      </div>

      <div className="episode-info absolute bottom-2 w-full px-4">
        <h3 className="text-lg font-semibold line-clamp-2">{episode.title.english}</h3>
        <p className="text-xs  font-bold line-clamp-2">

          Episode {episode.episodeNumber} :

          <span className="opacity-60">
            {episode.episodeTitle}
          </span>
        </p>
      </div>




    </div>


  );
};

export default EpisodeCard;
