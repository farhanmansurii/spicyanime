import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import Spinner from "react-spinner-material";
import Row from "../components/Row";
const SearchPage = () => {
  const [val, setval] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isloading, setisloading] = useState(true);
  const debouncedSearch = useDebounce(val, 500);
  useEffect(() => {
    async function fetchData() {
      setisloading(true);
      const data = await fetch(
        `https://spicyapi.vercel.app/meta/anilist/advanced-search?query=${debouncedSearch}&page=1&perPage=10`
      ).then((res) => res.json());
      setSearchList(data.results);
      setisloading(false);
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <>
      <div className="form-control  place-content-center">
        <div className="flex place-self-center mt-4  w-11/12 mx-auto   ">
          <input
            type="text"
            placeholder="
            Search for any Anime TV / Movie"
            className="  bg-[#e63946]/20 placeholder:text-[#E4E6C3] placeholder:font-light rounded-lg px-4 py-4 w-full backdrop-blur-sm bg-secondary/20    outline-none border-secondary "
            input={val}
            onChange={(e) => setval(e.target.value)}
          />
        </div>

        <div className=" flex overflow-x-scroll p-2 scrollbar-hide space-x-2 ">
          {val === "" ? (
            ""
          ) : !isloading ? (
            <Row typeOfAnime={searchList} />
          ) : (
            <div className="w-fit h-[200px] my-auto ease-in-out duration-200 grid justify-center mx-auto place-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e63946"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide animate-spin lucide-loader-2 w-12 h-12">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
