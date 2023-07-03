import CarousalProducts from "@/components/CarousalContainer";
import EpisodeCard from "@/components/EpisodeCard";
import RecentEpisodeRow from "@/components/RecentEpisodeRow";
import Row from "@/components/Row";
import { db } from "@/components/firebase";
import { updateRecentlyWatched, updateSavedEpisode } from "@/redux/reducers/recentlyWatchedReducers";
import { syncAnime } from "@/redux/reducers/savedAnime";
import axios from "axios";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-spinner-material";
import useSWR, { SWRConfig } from "swr";
export const fetcher = (url) => axios.get(url).then((res) => res.data);

function Anime() {
  const session = useSession()
  async function login() {

    const docRef = doc(db, "users", `${session?.data?.user?.email}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.data())
    {
      setDoc(docRef, {
        savedAnime: [],
      })
    }
    else
    {
      console.error("user exists")
    }
  }
  useEffect(() => {
    login()
    onSnapshot(doc(db, 'users', `${session?.data?.user?.email}`), (doc) => {
      dispatch(syncAnime(doc.data()?.savedAnime));
    })

  }, [session])

  const { data: popular, isLoading: popularIsLoading } = useSWR(
    "https://spicyapi.vercel.app/meta/anilist/popular?perPage=20",
    fetcher
  );
  const { data: action, isLoading: actionIsLoading } = useSWR(
    "https://spicyapi.vercel.app/meta/anilist/trending?perPage=20",
    fetcher
  );
  const { data: recentlyreleased } = useSWR(
    "https://spicyapi.vercel.app/meta/anilist/recent-episodes?page=1&perPage=20",
    fetcher
  );
  const dispatch = useDispatch();
  const recentlyWatched = useSelector((state) => state.recentlyWatched.items);

  const savedAnime = useSelector((state) => state.recentlyWatched.savedAnime);
  useEffect(() => {
    const storedState = localStorage.getItem("tvShowsState");
    if (storedState)
    {
      dispatch(updateRecentlyWatched(JSON.parse(storedState)));
    }
  }, []);
  return (
    <div>
      {popularIsLoading || actionIsLoading ? (
        <div className=" h-[100vh]  w-[97%] aspect-video ease-in-out duration-200 grid justify-center mx-auto place-content-center">
          <Spinner color="#e63946" />
        </div>
      ) : (
        <div className="flex flex-col   pb-24 lg:pb-10">
          {popular && <CarousalProducts anime={action?.results} />}
          <div className="my-10">
            {recentlyWatched.length > 0 && (
              <div className="w-11/12 gap mx-auto mb-10   ">
                <h2 className="text-2xl lg:text-3xl my-2 mx-2 ">
                    {session?.status === 'authenticated' ? `Continue Watching for ${session?.data?.user?.name.split(" ")[0]}` : "Continue Watching"}
                </h2>
                  <div className="flex flex-col  overflow-x-scroll p-2 scrollbar-hide mx-auto ">
                    <div className="flex gap-1 flex-nowrap ">
                  {recentlyWatched?.map((episode) => (
                    <>
                      <Link
                        href={`/${episode.episode.animeId}`}
                        key={episode.episode.animeId}
                        className="flex-col items-center  aspect-video   duration-100"
                      >
                        <div key={episode.id} className="episode-card flex-none relative w-64 h-40 rounded-lg   ">
                          <div className="overlay absolute rounded-t-lg inset-0 bg-[#111111]/60"></div>
                          <div className="episode-img-container w-full h-full rounded-t-lg overflow-hidden">
                            <img className="w-full h-full object-cover" src={episode.episode.image} alt={`Episode ${episode.episode.number}`} />
                          </div>
                          <div style={{ borderBottomLeftRadius: '3rem', border: '2px solid #e63946', width: `${Math.round(episode.episode.watchTime)}%` }}></div>




                          <div className="episode-info absolute text-left bottom-2 w-full px-4 ">
                            {/* <div className="bg-[#e63946] w-fit px-4 py-1 rounded text-xs">filler</div> */}

                            <h3 className=" text-md lg:text-lg  line-clamp-1">{episode.episode.title ? 'E' : "Episode "}{episode.episode.number}  {episode.episode.title && ": " + episode.episode.title}</h3>
                            <h3 className=" text-xs lg:text-md opacity-70 line-clamp-2">{episode.episode.description}</h3>
                          </div>
                        </div>

                      </Link>
                    </>
                  ))}
                    </div></div>
              </div>
            )}
              <Row typeOfAnime={action?.results} text="Trending Anime" />
            <RecentEpisodeRow recentlyreleased={recentlyreleased} />
            <Row typeOfAnime={popular?.results} text="Popular Anime" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 600000,
        fetcher,
        shouldRetryOnError: true,
      }}
    >
      <Anime />
    </SWRConfig>
  );
}
