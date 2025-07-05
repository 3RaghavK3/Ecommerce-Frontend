import cart from "../assets/cart.svg";
import notication from "../assets/notication.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <div className="flex justify-end items-center  gap-5  h-12 w-full bg-white text-gray-200 border-b border-b-[#636AE8] border-b-[1px] px-4">
      <img src={cart} className="w-6 h-6" alt="cart" />
      <img src={notication} className="w-6 h-6" alt="notifcation" />

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
