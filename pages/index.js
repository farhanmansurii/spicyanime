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
      console.log(doc.data()?.savedAnime);
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
                <div className="flex flex-row overflow-x-auto scrollbar-hide">
                  {recentlyWatched?.map((episode) => (
                    <>
                      <Link
                        href={`/${episode.animeId}`}
                        key={episode.animeId}
                        className="flex-shrink-0 flex-col items-center mx-1 aspect-video  h-[113px] w-[200px] lg:h-full lg:w-1/4 xl:w-3/12  duration-100"
                      >
                        <EpisodeCard episode={episode.episode} />
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
