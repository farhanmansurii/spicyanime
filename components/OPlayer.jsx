import Player from "@oplayer/core";
import hls from "@oplayer/hls";
import ui from "@oplayer/ui";
import { useEffect, useRef } from "react";

export default function OPlayer(props) {
  const { source, episode, handleNextEpisode } = props;
  const playerContainerRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    if (playerRef.current) return;
    playerRef.current = Player.make(playerContainerRef.current)
      .use([
        ui({
          theme: { primaryColor: "#e63946" },
          pictureInPicture: true,

          menu: [
            {
              name: "Next",
              icon: `  <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M16 18h2V6h-2M6 18l8.5-6L6 6v12z" />
    </svg> `,
              onClick: () => {
                handleNextEpisode(episode.id);
              },
            },
            {
              name: 'chromecast',
              icon: `<svg style='scale:0.9' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M662.186667 981.333333H361.813333c-17.194667 0-32.853333-9.386667-40.661333-23.552a50.176 50.176 0 0 1 0-47.104l150.186667-260.565333c7.808-14.08 23.466667-23.509333 40.661333-23.509333 17.194667 0 32.853333 9.386667 40.661333 23.552l150.186667 260.565333c7.850667 14.08 7.850667 32.938667 0 47.061333-7.808 14.122667-23.466667 23.552-40.661333 23.552z m-219.008-94.165333h137.642666L512 767.872l-68.821333 119.296z"></path><path d="M821.76 841.642667h-100.138667c-26.581333 0-46.933333-20.437333-46.933333-47.104 0-26.666667 20.352-47.104 46.933333-47.104h100.138667c37.546667 0 67.285333-29.824 67.285333-67.498667V204.373333c-1.578667-37.674667-31.317333-67.498667-67.285333-67.498666H203.818667c-37.546667 0-67.285333 29.866667-67.285334 67.498666v477.184c0 37.674667 29.738667 67.498667 67.285334 67.498667h100.096c26.624 0 46.933333 20.394667 46.933333 47.104 0 26.666667-20.309333 47.104-46.933333 47.104H203.818667A163.541333 163.541333 0 0 1 42.666667 679.893333V204.373333A161.194667 161.194667 0 0 1 203.818667 42.666667H821.76C909.354667 42.666667 981.333333 114.858667 981.333333 204.373333v477.141334c0 87.893333-71.978667 160.128-159.573333 160.128z"></path></svg>`,
              apply(player) {
                let cast
                let isCasting = false
                let currentMedia
                let session

                function initChromecast() {
                  return new Promise((resolve, reject) => {
                    const script = window.document.createElement('script')
                    script.setAttribute('type', 'text/javascript')
                    script.setAttribute(
                      'src',
                      'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'
                    )
                    window.document.body.appendChild(script)

                    window.__onGCastApiAvailable = (isAvailable) => {
                      if (isAvailable)
                      {
                        cast = window.chrome.cast
                        const sessionRequest = new cast.SessionRequest(
                          cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
                        )
                        const apiConfig = new cast.ApiConfig(
                          sessionRequest,
                          () => { },
                          (status) => {
                            if (status === cast.ReceiverAvailability.AVAILABLE)
                            {
                            } else
                            {
                            }
                          }
                        )
                        cast.initialize(apiConfig, resolve)
                      } else
                      {
                        player.plugins.ui.notice('Chromecast not available')
                        reject()
                        player.plugins.ui.menu.unregister('chromecast')
                      }
                    }
                  })
                }

                const discoverDevices = () => {
                  cast.requestSession(
                    (session) => {
                      session = session
                      launchMedia(player.options.video.url)
                    },
                    (err) => {
                      if (err.code === 'cancel')
                      {
                        session = undefined
                      } else
                      {
                        player.plugins.ui.notice('Chromecast: ' + err.code + (err.description || ''))
                      }
                    }
                  )
                }

                const launchMedia = (media) => {
                  const mediaInfo = new cast.media.MediaInfo(media)
                  const request = new cast.media.LoadRequest(mediaInfo)

                  if (!session)
                  {
                    window.open(media)
                    return false
                  }
                  session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError).play()
                  return true
                }

                const onMediaDiscovered = (how, media) => {
                  currentMedia = media
                }

                const onMediaError = (err) => {
                  player.plugins.ui.notice('Chromecast: ' + err.message)
                }

                player.plugins.ui.menu.register({
                  name: 'chromecast',
                  icon: `<svg style='scale:0.9' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2081" width="200" height="200"><path d="M895.66 128H128a85.44 85.44 0 0 0-85.44 85.44v127.84H128v-127.84h767.66v597.12H597.28V896H896a85.44 85.44 0 0 0 85.44-85.44V213.44A85.44 85.44 0 0 0 896 128zM42.56 767.16v127.84h127.82a127.82 127.82 0 0 0-127.82-127.84z m0-170.56V682a213.26 213.26 0 0 1 213.28 213.32v0.68h85.44a298.38 298.38 0 0 0-298-298.72h-0.66z m0-170.54v85.44c212-0.2 384 171.5 384.16 383.5v1h85.44c-0.92-258.92-210.68-468.54-469.6-469.28z"></path></svg>`,
                  onClick() {
                    let promis = Promise.resolve()
                    if (!cast)
                    {
                      promis = initChromecast()
                    }

                    promis.then((_) => {
                      if (isCasting)
                      {
                        isCasting = false
                        currentMedia?.stop()
                        session?.stop()
                      } else
                      {
                        isCasting = true
                        discoverDevices()
                      }
                    })
                  }
                })
              }
            }
          ],

          slideToSeek: "long-touch",
          controlBar: { back: "always" }, // | { back:  'always' | 'fullscreen' } // appbar
          topSetting: true,
          forceLandscapeOnFullscreen: true,
        }),
        hls(),
      ])
      .create();
  }, []);

  useEffect(() => {
    if (source)
    {
      playerRef.current.changeSource({
        title:
          episode.title !== "Full" &&
          `Episode ${episode?.number}  ${episode?.title}`,

        src: source,
        poster: episode.title !== "Full" && episode?.image,
      });
    }

    // listen
  }, [source, episode]);

  return (
    <div>
      <div className="w-full aspect-video  p-0 m-0 " ref={playerContainerRef} />
    </div>
  );
}
