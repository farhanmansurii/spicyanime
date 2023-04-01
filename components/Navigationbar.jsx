import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { RiHome2Fill, RiSearch2Fill } from "react-icons/ri";
export default function NavigationBar() {
  const session = useSession()
  console.log(session)
  return (
    <div className="z-50 w-full fixed mb-8 text-black bottom-0 lg:my-4">
      <div className=" flex gap-5 w-fit mx-auto items-center justify-center ">
        <Link href="/">
          <button className="p-4   border-4 border-black/50 hover:scale-110  duration-200  backdrop-blur-3xl bg-[#e63946] rounded-full ">
            <RiHome2Fill className="w-5 h-5" />
          </button>
        </Link>
        {
          session.status === 'authenticated' ?
            <Link href='/favourites'>
              <button className="  border-4 border-black/50  hover:scale-110  duration-200  backdrop-blur-3xl bg-[#e63946] rounded-full ">
                <img className="rounded-full w-16 h-16" src={session?.data?.user.image} />
              </button>
            </Link> :
            <Link href='/favourites'>

              <button className="p-4  border-4 border-black/50  hover:scale-110  duration-200  backdrop-blur-3xl bg-[#e63946] rounded-full ">

                <GrGoogle className="w-6 h-6" />
              </button>
            </Link>
        }
        <Link href={"/search"}>
          <button className="p-4   border-4 border-black/50  hover:scale-110 duration-200  backdrop-blur-3xl bg-[#e63946] rounded-full ">
            <RiSearch2Fill className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
