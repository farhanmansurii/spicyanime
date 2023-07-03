import AnimeCard from '@/components/AnimeCard';
import Row from '@/components/Row';
import { db } from '@/components/firebase';
import { syncAnime } from '@/redux/reducers/savedAnime';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function savedAnime() {
  const session = useSession()
  const dispatch = useDispatch()
  async function login() {

    const docRef = doc(db, "users", `${session?.data?.user?.email}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.data())
    {
      setDoc(docRef, {
        savedAnime: [],
      })
    }
  }
  useEffect(() => {
    login()
    onSnapshot(doc(db, 'users', `${session?.data?.user?.email}`), (doc) => {

      dispatch(syncAnime(doc.data()?.savedAnime));
    })

  }, [session])

  const savedAnime = useSelector((state) => state.syncAnime.savedAnime);


  return (
    <div className='w-11/12 mx-auto'>

      {session?.status === 'authenticated' ?


        <div className='mt-10'>
          <div className='flex items-center justify-between'>

            <h2 className="text-2xl lg:text-3xl my-2 mx-2 "> {`${session?.data?.user.name.split(" ")[0]}'s Favourites `}</h2>
            <div>{session?.status === 'authenticated' &&

              <div className=' rounded-full bg-red-500 border-4 border-red-500/20' onClick={() => signOut()}> <svg
                viewBox="0 0 1024 1024"
                fill="current"
                height="2em"
                width="2em"
              >
                <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z" />
              </svg> </div>
            }</div>
          </div>
          <div className="  flex overflow-x-scroll relative z-10 p-2  space-x-1 ">
            {savedAnime?.map((e) => (
              <Link href={`/${e.id}`} key={e.id}>
                <AnimeCard
                  key={e.id}
                  animeImg={e.image || e.coverImage.large}
                  title={e.title.english || e.title.userPreferred || e.title}
                  id={e.id}
                  type={e.type}
                  relationType={e.relationType}
                  releaseDate={e.releaseDate}
                />
              </Link>
            ))}
          </div>
        </div>

        : <div className='text-3xl mt-10 mb-5 flex whitespace-nowrap '>Login <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="1.5em"
          width="1.5em" className='mx-2 text-red-500 animate-pulse duration-200 hover:scale-105'
          onClick={() => signIn("google")}
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z" />
        </svg> </div>}
    </div>
  )


}
