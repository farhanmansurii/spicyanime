import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useSelector } from "react-redux";
export default function Navbar(props) {
  const { deets } = props
  const savedAnime = useSelector(state => state.syncAnime.savedAnime)
  function checkAnimeexists(savedAnime, animeId) {
    for (let i = 0; i < savedAnime.length; i++)
    {
      if (savedAnime[i].id === (deets.animeId))
      {
        return true;
      }
    }
    return false;
  }

  const isadded = (checkAnimeexists(savedAnime, deets.animeId));

  const animeDetails = deets.deets
  const session = useSession()
  const animeRef = doc(db, 'users', `${session?.data?.user?.email}`);
  const saveAnime = async () => {

    if (session)
    {
      await updateDoc(animeRef, {
        savedAnime: arrayUnion({
          title: animeDetails.title.english || animeDetails.title.userPreferred || animeDetails.title.romaji,
          id: deets.animeId,
          image: animeDetails.image,
          type: animeDetails.type,
          releaseDate: animeDetails.releaseDate

        })
      })
    }
  }
  const removeAnime = async () => {

    if (session)
    {
      await updateDoc(animeRef, {
        savedAnime: arrayRemove({
          title: animeDetails.title.english || animeDetails.title.userPreferred || animeDetails.title.romaji,
          id: deets.animeId,
          image: animeDetails.image,
          type: animeDetails.type,
          releaseDate: animeDetails.releaseDate

        })
      })
    }


  };
  return (
    <div className="absolute w-full my-6 lg:my-4">
      <div className=" text-black flex justify-between lg:justify-start gap-5 w-11/12 mx-auto">
        <Link href="/">
          <button className="p-3 bg-[#e63946] backdrop-blur-3xl rounded-full hover:scale-125 duration-200 border-4 border-black/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </button>
        </Link>
        {
          session.status === 'authenticated' && (!isadded ?

            <button onClick={() => saveAnime()} className="p-3 bg-[#e63946] backdrop-blur-3xl rounded-full hover:scale-125 duration-200 border-4 border-black/50"  >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-6 h-6"

              >
                <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
              </svg>
            </button> :
            <button onClick={() => removeAnime()} className="p-3 bg-[#e63946] backdrop-blur-3xl rounded-full hover:scale-125 duration-200 border-4 border-black/50"  >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor" className="w-6 h-6"

              >
                <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
              </svg>
            </button>)
        }
      </div>
    </div>
  );
}
