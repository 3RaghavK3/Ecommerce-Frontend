import { Button } from "./ui/button";
import banneritem from "../assets/banneritem.jpg";
export function Banner() {
  return (
    <>
      <div className="w-full h-[400px] flex items-center bg-[#F2F2FD] pl-20 pr-40">
        <div className="h-[70%]flex flex-col justify-between">
          <span>Absolutely hot collections 🔥</span>
          <div className="text-5xl font-bold leading-[1.15]">
            <div>The Best Place To</div>
            <div> Find And Buy</div>
            <div>
              Amazing <span className="text-accent">Product</span>{" "}
            </div>
          </div>

          <Button className="bg-primary w-fit p-5">Shop Now</Button>
        </div>

        <div className="h-[100%] flex-1 ">
          <img src={banneritem} className="w-full h-full object-contain" />
        </div>
      </div>
    </>
  );
}
