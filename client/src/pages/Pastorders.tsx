import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
export function PastOrders(){
    const orders_placed = JSON.parse(localStorage.getItem("PlacedOrders") || '{}');
    const navigate=useNavigate();
    return(
        
        <>
        <div className="min-h-screen p-10 border">
            <div className="text-4xl">Placed Orders</div>
            {orders_placed.length===0
            ?
                <div className="text-3xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
                <div>No Order Placed Yet 😢! Go Shopping.</div>
                <Button onClick={()=>navigate("/")} className="cursor-pointer">Shop Now</Button>
                </div>
            :
            <div>Okay order is there</div>
            
            
            }
        </div>
        </>
    )
}