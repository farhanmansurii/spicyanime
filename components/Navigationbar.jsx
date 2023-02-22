import Link from "next/link";
import { BiHomeCircle, BiSearchAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
export default function NavigationBar() {
  return (
    <div className="z-50 w-full fixed my-6 text-black bottom-0 lg:my-4">
      <div className=" flex gap-5 w-fit mx-auto items-center justify-center ">
        <Link href="/">
          <button className="p-4  hover:scale-125  duration-200  backdrop-blur-3xl bg-[#e63946]/50 rounded-full ">
            <BiHomeCircle className="w-5 h-5" />
          </button>
        </Link>
        <button className="p-4  hover:scale-125  duration-200  backdrop-blur-3xl bg-[#e63946]/50 rounded-full ">
          <FcGoogle className="w-6 h-6" />
        </button>
        <Link href={"/search"}>
          <button className="p-4  hover:scale-125 duration-200  backdrop-blur-3xl bg-[#e63946]/50 rounded-full ">
            <BiSearchAlt className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
