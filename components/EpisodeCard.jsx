import Image from 'next/image'
import React from 'react'

export default function EpisodeCard({episode}) {
  return (
    <div className="relative group">
      <Image
        src={episode.image}
        alt={`Episode ${episode.number}`}
        width={500}
        height={300}
        className="w-40  lg:w-full duration-150 cursor-pointer"
      />

      <div className="absolute text-left bottom-0 left-0 w-full py-1 bg-gradient-to-t from-black duration-150 to-transparent bg-opacity-60 text-white p-4 opacity-100 group-hover:from-red-500 ">
        <span className="block">{`Ep ${episode.number}`}</span>
        <span className="hidden lg:inline-block">{episode.title}</span>
      </div>
    </div>
  )
}
