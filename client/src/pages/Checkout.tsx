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

export function Checkout(){
    const navigate=useNavigate();
    
    const [selectedcard,setcard]=useState(0);
    const cards=[MasterCard,Visa,AmEx];

    const cart = JSON.parse(localStorage.getItem("CART")) || [];

    let bill=0;
    let qty=0;
    
    return(<>
        <div className="px-25 mt-5">{
            cart.length===0
            ?
            <div className="text-3xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
                <div>No items here yet 😢! Let's find something you'll love.</div>
                <Button onClick={()=>navigate("/")} className="cursor-pointer">Shop Now</Button>
                </div>

            :
            <>
                <div className="text-3xl font-bold ">Shopping Cart</div>
            <div className="flex gap-8 my-5 h-[85vh] px-10">
                <div className="w-3/4 flex flex-col bg-red">
                    <div className="grid grid-cols-5 gap-2 overflow-y-auto border-2 p-4 rounded-xl">
                        <div className="flex justify-left items-center text-xl font-semibold">Product</div>
                        <div className="flex justify-left items-center text-xl pl-4 font-semibold">Title</div>
                        <div className="flex justify-left items-center text-xl font-semibold">Price</div>
                        <div className="flex justify-left items-center text-xl font-semibold ">Quantity</div>
                        <div className="flex justify-left items-center text-xl font-semibold ">Subtotal</div>
                    

                       

                        {cart.map((item,index)=>{
                            qty+=item.quantity
                            bill+=item.price*item.quantity
                            return (<>
                                <div className="flex justify-left h-24 w-24 bg-muted rounded-lg border"><img src={item.images[0]||"-"}/></div>
                                <div className="flex flex-col justify-center p-4"> 
                                    <div className="flex justify-left items-center  font-bold text-lg">{item.title||"-"}</div>
                                    <div className="flex justify-left items-center text-base ">{item.brand||"-"}</div>
                                </div>
                            
                                <div className="flex justify-left items-center text-2xl font-bold">${item.price||"-"}</div>
                                <div className="flex justify-left items-center text-2xl font-bold">{item.quantity||"-"}</div>
                                <div className="flex justify-left items-center text-3xl font-bold">${Number(item.price*item.quantity).toFixed(2)||"-"}</div>
                            </>)
                        })}
                    </div>
                
                    <div className="flex justify-between  items-center mt-4">
                        
                        <div className="text-left text-xl cursor-pointer bg-accent text-white p-3 rounded-lg" onClick={()=>navigate('/')}>Update Cart</div>
                        <div className="flex p-3 bg-black rounded-lg text-white">
                            <div className="text-2xl"> Total:</div>{" "}
                            <div className="text-2xl font-bold"> ${Number(bill).toFixed(2)}</div>    
                        </div>
                         
                    </div>
                </div>
        
                <div className="flex flex-col w-1/4 shadow-lg p-4 justify-between">
                    <div className="text-2xl font-semibold">Payment Method</div>
                    <div>
                            <div>Choose</div>
                            <div className="flex gap-3" id="choose">
                                {cards.map((card,idx)=><div className={`${selectedcard === idx
                                                                                    ? "border-2 border-green-500"
                                                                                    : "border border-transparent"
                                                                                } cursor-pointer rounded-lg p-1 flex items-center justify-center}`}>
                                    <img src={card} className="block object-contain"
                                    onClick={()=>{setcard(idx)}} />
                                    </div>)}
                            </div>

                    </div>
                    
                    <div> <Label htmlFor="name">Name on the Card</Label>
                    <Input id="name" placeholder="Raghav Sharma"/></div>
                   
                    <div> <Label htmlFor="number">Card Number</Label>
                    <Input id="number" placeholder="4111 1111 1111 1111"/></div>
                   
                    <div className="flex gap-4" >
                        <div >
                                 <Label htmlFor="expiry font-bold">Expiration Date</Label>
                                 <Input id="expiry" placeholder="08 / 27"/>
                        </div>
                       
                          <div>
                                 <Label htmlFor="cvv font-bold" >CVV</Label>
                                 <Input id="cvv" placeholder="356"/>
                        </div>
                    </div>

                    <div>
                         <Label htmlFor="address" >Delivery Address</Label>
                         <Textarea id="address" placeholder="Flat 302, Green Heights Apartments, HSR Layout"  className="h-25 overflow-y-auto"/>
                    </div>
                    
                    <div className="flex gap-4">
                                <div>
                         <Label htmlFor="city" >City</Label>
                         <Input id="city" placeholder="Bengaluru"/>
                    </div>

                    <div>
                         <Label htmlFor="zip" >Pincode</Label>
                         <Input id="zip" placeholder="560102"/>
                    </div>
                    </div>
                    
                    <div className="justify-center flex">
                        <Button className="bg-[var(--assertive)]  rounded-sm cursor-pointer text-lg" onClick={()=>{navigate("/payment")}}>Proceed to Pay ${Number(bill).toFixed(2)}</Button>
                    </div>
                    
                </div>
            </div>
            </>
            }
            
        </div>
    </>)
}