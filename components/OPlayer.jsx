import Player from "@oplayer/core";
import hls from "@oplayer/hls";
import ui from "@oplayer/ui";
import { useEffect, useRef } from "react";

export default function OPlayer(props) {
  const { sources, episode, handleNextEpisode } = props;

  const playerRef = useRef();
  const poster = episode.image
  const title = "E" + episode.number + " " + episode.title
  useEffect(() => {
    // Create the player only once using the initial values
    if (!playerRef.current)
    {
      playerRef.current = Player.make('#oplayer', { poster, title }).use([ui({
        theme: {
          primaryColor: "red",
        }, preload: 'auto',
        pictureInPicture: true,



        settings: ['loop',
          {
            name: 'Quality',
            key: 'KEY',
            type: 'selector', // or 'switcher'

            icon: ` <svg
            viewBox="0 0 24 24"
            fill="currentColor"
         className='w-7 h-7 '
          >
            <path d="M14.5 13.5h2v-3h-2M18 14a1 1 0 01-1 1h-.75v1.5h-1.5V15H14a1 1 0 01-1-1v-4a1 1 0 011-1h3a1 1 0 011 1m-7 5H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11m8-5H5c-1.11 0-2 .89-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
          </svg>`,
            children: sources.map((source) => ({
              name: source.quality,
              value: source.url,
              default: source.quality === "default",
            })),
            onChange({ value }) {
              playerRef.current.changeQuality({ src: value, poster, title })
            }
          }]
        , topSetting: true,
        controlBar: true
        ,
        menu: [

          {
            name: 'Next episode',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-last"><polyline points="7 18 13 12 7 6"/><path d="M17 6v12"/></svg>`,
            onClick: () => {

              handleNextEpisode(episode.id);

            },
          }
        ],
      }), hls({ forceHLS: true }),]).create();

    }



  }, []); // Empty dependency array ensures this effect runs only once on initial render



  useEffect(() => {
    // Update the player source and subtitles when sources change
    if (!playerRef.current) return;




    playerRef.current.changeSource({ src: sources[sources.length - 1]?.url, poster, title });


  }, [sources, episode]);

  return (
    <>
      <div key={episode.id} className="w-full my-5">
        {episode ? (
          <div className="justify-center flex">

            <div
              className="w-full h-full lg:w-[720px] aspect-video border-white/30"
              id="oplayer" />


          </div>
        ) : (
          <div className="w-full h-full lg:w-[720px] aspect-video border-white/30 flex items-center justify-center border mx-auto">Loading</div>
        )}


      </div>


    </>
  );
};
