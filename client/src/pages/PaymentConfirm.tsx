
import { LoaderCircle } from "lucide-react";
import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PaymentConfirm(){

    const [loading,setloading]=useState(false);
    const [countdowntimer,setcountdown]=useState(3);
    const navigate=useNavigate();
    const [OrderId,setorderid]=useState(null);

    
    const placeOrder=()=>{
            const current_order_id=Date.now()+Math.floor(Math.random()*1000);
            setorderid(current_order_id);
            const current_cart=JSON.parse(localStorage.getItem("CART"));
            localStorage.setItem("CART",JSON.stringify([]));
            
            console.log(localStorage.getItem("PlacedOrders"));
            const orders_placed=JSON.parse(localStorage.getItem("PlacedOrders")||'{}')
            localStorage.setItem("PlacedOrders",JSON.stringify({...orders_placed,[current_order_id]:current_cart}));
    }
   
    const countdown=()=>{
        //every 1s it should keep firing out

        const interval=setInterval(() => {
            setcountdown((prev)=>{
                if(prev-1===0){
                    clearInterval(interval)
                    navigate("/")
                    return 0;
                } 
                else return prev-1;
            })
        }, 1000);

    }


    useEffect(()=>{
     setloading(true);
     placeOrder();
     {setTimeout(() => {
             setloading(false);
             countdown();
        }, 2500);}
    },[])



    return(
        
       <>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 flex  flex-col items-center justify-center">
            
            <div className="text-4xl flex flex-col items-center">
                {loading?`Payment in Progress..`:
            <>
            <div>Order Id-{OrderId} successfully placed</div>
            <div>Redirecting back to Homepage in {countdowntimer}</div>
            </>
           
            }</div>
            
            {loading && <LoaderCircle className="animate-spin h-64 w-64"/>}
       </div> 
    </>
        
    )

}