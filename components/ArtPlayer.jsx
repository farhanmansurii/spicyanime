import { useEffect, useRef, useState } from "react";

import Hls from "hls.js";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";

const MyComponent = ({ source, episode }) => {
  const ref = useRef(null);
  const [isIOS, setIsIOS] = useState(false);

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

    // Detect if the device is an iPhone
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, [source]);

  if (isIOS) {
    // Use a different video player for iOS
    return (
      <video id="plyr" controls playsInline>
        <source src={source} type="application/x-mpegURL" />
      </video>
    );
  } else {
    // Use Plyr for other devices
    return (
      <Plyr
        id="plyr"
        source
        iosNative={true}
        autoPlay={false}
        playsInline={true}
        title={episode?.title}
        ref={ref}
      />
    );
  }
};

export default function ArtPlayer({ source, episode }) {
  const supported = Hls.isSupported();

  return (
    <div>
      <MyComponent source={source} episode={episode} />
    </div>
  );
}
