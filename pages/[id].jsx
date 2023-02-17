import Animedetails from "@/components/Animedetails";
import Episodes from "@/components/Episodes";
import Row from "@/components/Row";
import VideoPlayer from "@/components/VideoPlayer";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from ".";

const subtitles = [{"url":"https://prev.zorores.com/_a_preview/78/78d4202e6ae622f1b777f0c6e713cb8e/thumbnails/sprite.vtt","lang":"Thumbnails"}]

const sources = [{"url":"https://c-an-ca1.betterstream.cc:2223/hls-playback/069a7362994f77e6fd9c735c66285559a4befba744062798f650fc4f1a8b30684cf1eb6e6ff6f3c4a6d17220d37eee6526fb8856feb2ce4e4a1f290ceb0997a1b59326155c9377762ea02a714fa8a70fccb65afa3356fbcecc24b294bbb3b37aca86a3140aaba08c59dc9724bee6e650fb79b254936f126bfb9e8156fd5652eaa3b6d1dfd3ff1a0147e4cf27587ff315/index-v1-a1.m3u8","quality":"480p","isM3U8":true},{"url":"https://c-an-ca1.betterstream.cc:2223/hls-playback/069a7362994f77e6fd9c735c66285559a4befba744062798f650fc4f1a8b30684cf1eb6e6ff6f3c4a6d17220d37eee6526fb8856feb2ce4e4a1f290ceb0997a1b59326155c9377762ea02a714fa8a70fccb65afa3356fbcecc24b294bbb3b37aca86a3140aaba08c59dc9724bee6e650fb79b254936f126bfb9e8156fd5652eaa3b6d1dfd3ff1a0147e4cf27587ff315/master.m3u8","isM3U8":true,"quality":"auto"}]

export async function getServerSideProps(context) {
  const animeId = context.query.id;
  const detailsResponse = await fetch(`https://api.consumet.org/meta/anilist/info/${animeId}?provider=crunchyroll`);
  const details = await detailsResponse.json();



  return {
    props: {
      deets: details,
      animeId: animeId,
    }
  };
}
export default function AnimeDetails(deets) {

  console.log(deets.deets)
  return (
    <div>
      <div className=" flex-column  ">
        <Animedetails deets={deets.deets} />
      </div>
      <div>
        <Episodes animeId={deets.animeId} />
      </div>
      <div>

        </div>
      <Row typeOfAnime={deets.deets.relations} />
    </div>
  );
}
