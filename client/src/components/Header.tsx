import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Bell } from "lucide-react";
export function Header() {
  const navigate=useNavigate();
  return (
    <div className="flex justify-end items-center  gap-5  h-12 w-full bg-white text-gray-200 border-b border-b-[#636AE8] border-b-[1px] px-4">
      <ShoppingCart  onClick={()=>navigate("/checkout")}  className="w-6 h-6 cursor-pointer text-black"/>
      <Bell className="w-6 h-6 cursor-pointer text-black"/>

      <Avatar  className="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
