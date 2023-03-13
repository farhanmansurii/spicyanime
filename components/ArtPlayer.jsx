import 'vidstack/styles/defaults.css';

import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import React from 'react'

export default function ArtPlayer(source) {
  return (
    <div><MediaPlayer
      src={source}
      controls
    >
      <MediaOutlet />
    </MediaPlayer>
    </div>
  )
}
