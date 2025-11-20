import { Button } from "./ui/button";
import banneritem from "../assets/banneritem2.png";

export function Banner() {
  return (
    <>
      <div className="w-full flex flex-col  items-center md:flex-row items-center  bg-[#F2F2FD] p-5 md:p-10 md:px-15 lg:px-40">
        <div className="h-[70%]flex flex-col text-center md:text-left  flex-1">
          <span className="text-sm md:text-base lg:text-xl">
            Absolutely hot collections
          </span>
          <div className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] gap-10">
            <div className="font-semibold">The Best Place To</div>
            <div className="font-semibold"> Find And Buy</div>
            <div className="font-bold">
              Amazing <span className="text-primary">Product</span>
            </div>

            <div className="w-fit text-lg md:text-2xl lg:text-4xl p-1 px-3 rounded-sm text-white overflow-y-hidden bg-accent mt-4 ">
              Browse our collections below
            </div>
          </div>
        </div>

        <div className="h-[100%] flex-1">
          <img src={banneritem} className="w-full h-full object-contain" />
        </div>
      </div>
    </>
  );
}
