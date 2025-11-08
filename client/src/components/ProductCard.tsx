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
}: {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}) {
  
  
  const navigate = useNavigate();
  const {SucessDialog} = useContext(DialogContext);

  const quickAddtoCart=()=>{
      const cart=JSON.parse(localStorage.getItem("CART")||"[]")

      const existingid=cart.findIndex((product)=>product.id==id)
       if(existingid==-1){
                fetch(`http://localhost:3000/products/getinfo?id=${id}`)
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
        className="h-full"
      >
        <CardContent className="cursor-pointer" onClick={() => {
          navigate(`/product/getInfo/${id}`);
        }}>
          <div>
    
            <img
              src={images?.[0]}
              className="h-70"
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <span className="text-3xl font-bold">${price}</span>
          <Button className="text-xl h-10 w-10 cursor-pointer" onClick={()=>quickAddtoCart()}><ShoppingCart/></Button>
        </CardFooter>
      </Card>
    </>
  );
}
