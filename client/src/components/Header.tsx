import cart from "../assets/cart.svg";
import notication from "../assets/notication.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
export function Header() {
  const navigate=useNavigate();
  return (
    <div className="flex justify-end items-center  gap-5  h-12 w-full bg-white text-gray-200 border-b border-b-[#636AE8] border-b-[1px] px-4">
      <img src={cart} className="w-6 h-6" alt="cart" />
      <img src={notication} className="w-6 h-6" alt="notifcation" />
      
      <Avatar onClick={()=>navigate("/checkout")} className="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
