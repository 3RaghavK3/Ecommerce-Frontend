import { Button } from "./ui/button";
import banneritem from "../assets/banneritem2.png";

export function Banner() {
  return (
    <>
      <div className="w-full h-[400px] flex items-center bg-[#F2F2FD] px-40">
        <div className="h-[70%]flex flex-col justify-between flex-1">
          <span className="text-lg">Absolutely hot collections</span>
          <div className="text-6xl  leading-[1.15] gap-10">
            <div className="font-semibold">The Best Place To</div>
            <div className="font-semibold"> Find And Buy</div>
            <div className="font-bold">
              Amazing <span className="text-primary">Product</span>
            </div>
                      
          <div className="w-fit text-3xl p-1 px-3 rounded-sm text-white overflow-y-hidden bg-accent mt-4">Browse our collections below</div>

          </div>
        </div>

        <div className="h-[100%] flex-1  ">
          <img src={banneritem} className="w-full h-full object-contain" />
        </div>
      </div>
    </>
  );
}
