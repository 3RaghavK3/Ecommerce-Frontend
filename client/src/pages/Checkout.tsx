import { useEffect, useState } from "react"

export function Checkout(){
    const [yourcart,setyourcart]=useState([]);

    useEffect(()=>{
        setyourcart(JSON.parse(localStorage.getItem("CART")) || []);
    },[])

    let bill=0;
    
    return(<>
        <div className="px-50">
            <div className="text-4xl font-bold">Checkout</div>
            <div className="flex">
                <div className="w-3/4 grid grid-cols-6" >
                    <div className="flex justify-center items-center text-2xl font-bold">Product Image</div>
                    <div className="flex justify-center items-center text-2xl font-bold">Title</div>
                    <div className="flex justify-center items-center text-2xl font-bold">Brand</div>
                    <div className="flex justify-center items-center text-2xl font-bold">Price</div>
                    <div className="flex justify-center items-center text-2xl font-bold">Quantity</div>
                    <div className="flex justify-center items-center text-2xl font-bold">Subtotal</div>

                    {yourcart.map((item,index)=>{
                        bill+=item.price*item.quantity
                        return (<div key={index} className="contents">
                            <div className="flex justify-center items-center"><img src={item.thumbnail||"-"} className="object-contain w-20 h-20" /></div>
                            <div className="flex justify-center items-center">{item.title||"-"}</div>
                            <div className="flex justify-center items-center">{item.brand||"-"}</div>
                            <div className="flex justify-center items-center">${item.price||"-"}</div>
                            <div className="flex justify-center items-center">{item.quantity||"-"}</div>
                            <div className="flex justify-center items-center">${item.price*item.quantity||"-"}</div>
                        </div>)
                    })}

                    <div className="col-span-3 text-left text-4xl"> Continue Shopping</div>
                    <div className="col-span-2 text-right text-3xl"> Total </div>
                    <div className="text-right font-3xl"> ${bill}</div>        
                </div>
                <div className="flex flex-col w-1/4 border-green-400 border-2">x</div>
            </div>
        </div>
    </>)
}