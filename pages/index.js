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
      console.log("user exists")
    }
  }
  useEffect(() => {
    login()
    onSnapshot(doc(db, 'users', `${session?.data?.user?.email}`), (doc) => {
      console.log(doc.data()?.savedAnime,);
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
    "https://spicyapi.vercel.app/meta/anilist/recent-episodes?page=1&perPage=10",
    fetcher
  );
  const dispatch = useDispatch();
  const recentlyWatched = useSelector((state) => state.recentlyWatched.items);
  console.log(recentlyWatched)
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
                  <div className="flex flex-row  scrollbar-hide">
                  {recentlyWatched?.map((episode) => (
                    <>
                      <Link
                        href={`/${episode.episode.animeId}`}
                        key={episode.episode.animeId}
                        className="flex-shrink-0 flex-col items-center mx-1 aspect-video   duration-100"
                      >
                        <div key={episode.episode.id} className="episode-card flex-none relative w-64 h-36 rounded-lg   ">
                          <div className="overlay absolute rounded-lg inset-0 bg-[#111111]/20 hover:bg-[#111111]/50"></div>
                          <div className="episode-img-container rounded-lg w-full h-full overflow-hidden">
                            <img className="w-full h-full object-cover rounded-lg" src={episode.episode.image} alt={`Episode ${episode.episode.episode}`} />
                          </div>




                          <div className="episode-info absolute text-left bottom-2 w-full px-4 ">
                            {/* <div className="bg-[#e63946] w-fit px-4 py-1 rounded text-xs">filler</div> */}

                            <h3 className=" text-md lg:text-lg  line-clamp-1">E{episode.episode.number} : {episode.episode.title}</h3>
                            <h3 className=" text-xs lg:text-md opacity-70 line-clamp-2">{episode.episode.description}</h3>
                          </div>
                        </div>

                      </Link>
                    </>
                  ))}
                </div>
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
