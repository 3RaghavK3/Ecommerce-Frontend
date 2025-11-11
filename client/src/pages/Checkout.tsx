import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import AmEx from "../assets/AmEx.svg";
import MasterCard from "../assets/Mastercard.svg"
import Visa from "../assets/Visa.svg"
import { Button } from "@/components/ui/button";
import { MarketContext } from "../context/MarketContext";
import { Cartbuilder } from "@/components/cartbuilder";


export function Checkout(){
    const navigate=useNavigate();
    
    const [selectedcard,setcard]=useState(0);
    const cards=[MasterCard,Visa,AmEx];

    const cart = JSON.parse(localStorage.getItem("CART")) || { items: [], totalq: 0, totalbill: 0 };
    console.log(cart);
    
    return(
    <>
    <div className="px-8 mt-5">
  {
    cart.items.length === 0 ? (
      <div className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
        <div>No items here yet 😢! Let's find something you'll love.</div>
        <Button onClick={() => navigate("/")} className="cursor-pointer">Shop Now</Button>
      </div>
    ) : (
      <>
        <div className="text-3xl font-bold">Shopping Cart</div>
        <div className="flex">
                    <div className="flex my-5 h-[85vh] px-10 w-3/4 overflow-y-scroll">
                    <Cartbuilder cart={cart}/>
                    </div>

        <div className="flex flex-col shadow-lg p-4 justify-between w-1/4">
          <div className="text-2xl font-semibold">Payment Method</div>

          <div>
            <div>Choose</div>
            <div className="flex gap-3" id="choose">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className={`${
                    selectedcard === idx
                      ? "border-2 border-green-500"
                      : "border border-transparent"
                  } cursor-pointer rounded-lg p-1 flex items-center justify-center`}
                  onClick={() => setcard(idx)}
                >
                  <img src={card} className="block object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="name">Name on the Card</Label>
            <Input id="name" placeholder="Raghav Sharma" />
          </div>

          <div>
            <Label htmlFor="number">Card Number</Label>
            <Input id="number" placeholder="4111 1111 1111 1111" />
          </div>

          <div className="flex gap-4">
            <div>
              <Label htmlFor="expiry">Expiration Date</Label>
              <Input id="expiry" placeholder="08 / 27" />
            </div>

            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="356" />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Flat 302, Green Heights Apartments, HSR Layout"
              className="h-25 overflow-y-auto"
            />
          </div>

          <div className="flex gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Bengaluru" />
            </div>

            <div>
              <Label htmlFor="zip">Pincode</Label>
              <Input id="zip" placeholder="560102" />
            </div>
          </div>

          <div className="justify-center flex">
            <Button
              className="bg-[var(--assertive)] rounded-sm cursor-pointer text-lg"
              onClick={() => navigate("/payment")}
            >
              Proceed to Pay ${Number(cart.totalbill).toFixed(2)}
            </Button>
          </div>
        </div>
        </div>
        
      </>
    )
  }
</div>

    </>
        
    )
}