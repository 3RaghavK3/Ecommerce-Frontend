import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cartbuilder } from "@/components/cartbuilder";

export function PastOrders() {
  const orders_placed = JSON.parse(
    localStorage.getItem("PlacedOrders") || "[]",
  );
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-2 md:p-5 lg:p-10 border bg-[#f3f3f3]/25">
      {orders_placed.length === 0 ? (
        <div className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4 ">
          <div className="text-center">No Order Placed Yet 😢! Go Shopping.</div>
          <Button onClick={() => navigate("/")} className="cursor-pointer">
            Shop Now
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-2xl md:text-3xl lg:text-4xl mb-4">Placed Orders</div>
          <div className="border-2 rounded-xl p-4  border-black">
            <div className="grid grid-cols-[80px_80px_repeat(2,minmax(0,1fr))] md:grid-cols-5 gap-3 font-bold text-sm md:text-base lg:text-lg bg-primary/15 p-4 w-full">
              <div className="hidden md:block">OrderId</div>
              <div>Date</div>
              <div>Time</div>
              <div>Qty</div>
              <div>Amount</div>
            </div>

            {[...orders_placed].reverse().map((order, idx) => {
              return (
                <div
                  className="grid grid-cols-[80px_80px_repeat(2,minmax(0,1fr))] md:grid-cols-5 gap-3 cursor-pointer p-4 text-sm md:text-base lg:text-lg  bg-accent/15 my-2 rounded-sm hover:bg-primary hover:text-white w-full"
                  key={idx}
                  onClick={() => navigate(`/orderid/${order.OrderId}`)}
                >
                  <div className="hidden md:block">{order.OrderId}</div>
                  <div>{order.Date}</div>
                  <div>{order.Time}</div>
                  <div>{order.details.totalq}</div>
                  <div>${Number(order.details.totalbill).toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
