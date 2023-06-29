import Hls from "hls.js";
import { useCallback, useEffect, useState } from "react";
import OPlayer from "./OPlayer";

const Player = ({ sources, episode, handleNextEpisode }) => {


  return (
    <div key={episode.id} className="w-full mb-7 ">
      {episode ? (
        <div className="justify-center flex ">
          <div className="w-full h-full   lg:w-[720px] aspect-video ">
            <OPlayer
              source={sources}
              episode={episode}
              handleNextEpisode={handleNextEpisode}
              className="aspect-video "
            />
          </div>

        </div>
      ) : (
        <div>Loading</div>
      )}

    </div>
  );
};

export default Player;
