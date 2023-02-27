import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { RiHome2Fill, RiSearch2Fill } from "react-icons/ri";
export default function NavigationBar() {
  return (
    <div className="z-50 w-full fixed my-6 text-black bottom-0 lg:my-4">
      <div className=" flex gap-5 w-fit mx-auto items-center justify-center ">
        <Link href="/">
          <button className="p-4   border-4 border-black/50 hover:scale-110  duration-200  backdrop-blur-3xl bg-[#e63946] rounded-full ">
            <RiHome2Fill className="w-5 h-5" />
          </button>
        </Link>
        <button className="p-4  border-4 border-black/50  hover:scale-110  duration-200  backdrop-blur-3xl bg-[#e63946] rounded-full ">
          <GrGoogle className="w-6 h-6" />
        </button>
        <Link href={"/search"}>
          <button className="p-4   border-4 border-black/50  hover:scale-110 duration-200  backdrop-blur-3xl bg-[#e63946] rounded-full ">
            <RiSearch2Fill className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
