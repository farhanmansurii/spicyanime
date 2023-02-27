import Link from "next/link";
import { BsFillPlayFill } from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
const CarousalCard = (props) => {
  return (
    <div className="w-full relative  h-[250px] lg:h-[350px]  ">
      <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#0b090a] to-transparent" />
      <div
        style={{
          backgroundImage: `url(${props.props.cover})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "full",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full"
      />
      <div className="z-50 flex lg:gap-3 flex-col absolute w-11/12 mx-auto justify-end uppercase inset-0">
        <div className="mx-auto text-left text-3xl lg:text-5xl w-full capitalize">
          {props.props.title.english || props.props.title.userPreferred || ""}
        </div>
        <div className="text-sm hidden lg:block capitalize lg:line-clamp-2 w-6/12">
          {props.props.description}
        </div>
        <div className="flex pt-3 gap-3">

        <Link className="w-fit flex" href={`/${props.props.id}`}>
          <span>  <BsFillPlayFill className=" text-black border-4 border-black/50 w-12 h-12 bg-[#e63946] p-2 rounded-full " /> </span> <span></span>
        </Link>
          <span>  <AiOutlinePlus className=" bg-black border-4 border-[#e63946]/50 w-12 h-12 text-[#e63946] p-2 rounded-full " /> </span> <span></span>
        </div>


      </div>
    </div>
  );
};

export default CarousalCard;
