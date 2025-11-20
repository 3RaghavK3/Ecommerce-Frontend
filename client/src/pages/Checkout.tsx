import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cartbuilder } from "@/components/cartbuilder";


export function Checkout(){
    const navigate=useNavigate();


    const cart = JSON.parse(localStorage.getItem("CART")) || { items: [], totalq: 0, totalbill: 0 };
    console.log(cart);
    
    return(
    <>
    <div className="px-8 mt-5 bg-[#f3f3f3]/25">
  {
    cart.items.length === 0 ? (
      <div className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
        <div>No items here yet! Let's find something you'll love.</div>
        <Button onClick={() => navigate("/")} className="cursor-pointer">Shop Now</Button>
      </div>
    ) : (
      <>
        <div className="text-lg md:text-xl lg:text-2xl font-bold">Checkout</div>
        <div className="flex flex-col  items-center md:flex-row justify-around mt-3 gap-10 lg:px-50  bg-accent/1 text-sm ">

        <div className="flex flex-col shadow-lg p-4 justify-between shadow-xl bg-white md:h-[65vh] lg:h-[85vh]">
          <div className="text-lg md:text-xl lg:text-2xl font-semibold">Shipping Information</div>
          <div>
            <Label htmlFor="name" className="font-bold">Full Name</Label>
            <Input id="name" className="border-2 border-black rounded-none" placeholder="Raghav Sharma" />
          </div>

          <div>
            <Label htmlFor="email"  className="font-bold">Email Address</Label>
            <Input required id="email" className="border-2 border-black rounded-none" placeholder="xyz@gmail.com" />
          </div>

         
            <div>
              <Label htmlFor="ph"  className="font-bold">Phone Number</Label>
              <div className="flex">
                
              </div>
              <Input id="ph" className="border-2 border-black rounded-none" placeholder="+91 9876543210" />
            </div>
          
          <div>
            <Label htmlFor="address"  className="font-bold">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Flat 302, Green Heights Apartments, HSR Layout"
              className="h-25 overflow-y-auto border-2 border-black rounded-none"
            />
          </div>

          <div className="flex gap-4">
            <div>
              <Label htmlFor="city" className="font-bold">City</Label>
              <Input id="city" placeholder="Bengaluru" className="border-2 border-black rounded-none" />
            </div>

             <div>
              <Label htmlFor="state"  className="font-bold">State</Label>
              <Input id="state" placeholder="Karnataka" className="border-2 border-black rounded-none" />
            </div>

            <div>
              <Label htmlFor="zip"  className="font-bold">Pincode</Label>
              <Input id="zip" placeholder="560102" className="border-2 border-black rounded-none" />
            </div>
          </div>
        </div>
        <div className="flex w-fit border-2">
                    <Cartbuilder cart={cart}/>
                    </div>
        </div>
        
      </>
    )
  }
</div>

    </>
        
    )
}