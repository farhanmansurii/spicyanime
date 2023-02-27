import Link from "next/link";

export default function Navbar() {
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
