import { useEffect, useRef } from "react";

import Hls from "hls.js";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";

const MyComponent = ({ source }) => {
  const ref = useRef(null);
  useEffect(() => {
    const loadVideo = async () => {
      const video = document.getElementById("plyr");
      var hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      ref.current.plyr.media = video;

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        ref.current.plyr.play();
      });
    };
    loadVideo();
  }, [source]);

  return <Plyr id="plyr" options={{ volume: 0.1 }} source ref={ref} />;
};

export default function ArtPlayer({ source }) {
  const supported = Hls.isSupported();

  return (
    <div>
      <MyComponent source={source} />
    </div>
  );
}
