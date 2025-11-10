import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { DialogContext } from "@/context/DialogContext";

export function Productcard({
  id,
  title,
  description,
  price,
  images,
  discountPercentage
}: {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  discountPercentage:number;
}) {
  
  
  const navigate = useNavigate();
  const {SucessDialog} = useContext(DialogContext);

  const quickAddtoCart=()=>{
      const cart=JSON.parse(localStorage.getItem("CART")||"[]")

      const existingid=cart.findIndex((product)=>product.id==id)
       if(existingid==-1){
                fetch(`${import.meta.env.VITE_API_URL}/products/getinfo?id=${id}`)
                .then((res) => res.json())
                .then((data)=>{
                    localStorage.setItem("CART",JSON.stringify([...cart,{...data.data,"quantity":1}]))
                    SucessDialog({ msg: "Added to cart!", desc: `1 x ${data.data.title} has been added. You can review your cart now.`  });
                })
                .catch((e)=>console.log(e.msg))
            }
            else{
                cart[existingid].quantity+=1;
                localStorage.setItem("CART",JSON.stringify(cart))
                SucessDialog({ msg: "Added to cart!", desc: `1 x ${cart[existingid].title} has been added. You can review your cart now.`  });

            }
            
        }

  return (
    <>
      <Card
        className="h-full border-black rounded-sm shadow-xl p-0 flex flex-col justify-between transition-transform duration-500 hover:scale-101"
      >
        <CardContent className="cursor-pointer p-0" onClick={() => {
          navigate(`/product/getInfo/${id}`);
        }}>
          <div className="text-center bg-primary">
            <CardTitle className="text-xl p-2 text-white">{title}</CardTitle>
          </div>
          <div className="flex items-center justify-center">
    
            <img
              src={images?.[0]}
              className="h-70"
            />
          </div>
     
          <CardDescription className="px-8">{description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-8 pb-8">
          <div className="flex items-center gap-2">
             <span className="text-3xl font-bold">${price}</span>
             <span className="bg-accent rounded-sm text-white p-1 px-2">-{discountPercentage}%</span>
          </div>
          <Button className="text-xl h-10 w-10 cursor-pointer" onClick={()=>quickAddtoCart()}><ShoppingCart/></Button>
        </CardFooter>
      </Card>
    </>
  );
}
