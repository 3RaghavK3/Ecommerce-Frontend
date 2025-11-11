import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cartbuilder } from "@/components/cartbuilder";

export function PastOrders() {
    const orders_placed = JSON.parse(localStorage.getItem("PlacedOrders") || '[]');
    const navigate = useNavigate();


    return (
        <div className="min-h-screen p-10 border">
            {orders_placed.length === 0 ? (
                <div className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4 ">
                    <div>No Order Placed Yet 😢! Go Shopping.</div>
                    <Button onClick={() => navigate("/")} className="cursor-pointer">Shop Now</Button>
                </div>
            ) : (
                <div>
                    <div className="text-4xl mb-4">Placed Orders</div>
                    <div className="border-2 rounded-xl p-4 border-black">
                    <div className="grid grid-cols-5 gap-3 font-bold text-3xl bg-primary/15 p-4">
                        <div>OrderId</div>
                        <div>Date</div>
                        <div>Time</div>
                        <div>Quantity</div>
                        <div>Amount Paid</div>
                    </div>

                        {[...orders_placed].reverse().map((order,idx)=>{
                            return (
                                <div className="grid text-2xl grid-cols-5 gap-3 cursor-pointer p-4  bg-accent/15 my-2 rounded-sm hover:bg-primary hover:text-white" key={idx} onClick={()=>
                                navigate(`/orderid/${order.OrderId}`)}>
                                    <div>{order.OrderId}</div>
                                    <div>{order.Date}</div>
                                    <div>{order.Time}</div>
                                    <div>{order.details.totalq}</div>
                                    <div>${order.details.totalbill}</div>
                                </div> 
                            )
                        })}

                    </div>
                    

                    
                </div>
            )}
        </div>
    );
}


 