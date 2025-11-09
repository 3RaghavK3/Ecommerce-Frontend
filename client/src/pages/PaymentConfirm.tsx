import { Card } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export function PaymentConfirm() {
    const [loading, setLoading] = useState(false);
    const [countdownTimer, setCountdown] = useState(2312320);
    const navigate = useNavigate();
    const [OrderId, setOrderId] = useState(null);

    const placeOrder = () => {
        const current_order_id = Date.now() + Math.floor(Math.random() * 1000);
        const orderDate=new Date().toLocaleDateString();
        const orderTime=new Date().toLocaleTimeString();
        setOrderId(current_order_id);
        const current_cart = JSON.parse(localStorage.getItem("CART"));
        localStorage.setItem("CART", JSON.stringify([]));

        console.log(localStorage.getItem("PlacedOrders"));
        const orders_placed = JSON.parse(localStorage.getItem("PlacedOrders") || '{}');
        localStorage.setItem("PlacedOrders", JSON.stringify({ ...orders_placed, [current_order_id]: {current_cart,orderDate,orderTime}}));
    };

    const countdown = () => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev - 1 === 0) {
                    clearInterval(interval);
                    navigate("/");
                    return 0;
                } else return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        setLoading(true);
        placeOrder();
        setTimeout(() => {
            setLoading(false);
            countdown();
        }, 2500);
    }, []);

    return (
        <div className="h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
            <Card className="flex flex-col items-center shadow-2xl px-8 py-16 justify-around">
                {loading ? (
                    <>
                        <div className="text-4xl font-bold">
                             Payment in Progress
                        </div>
                        <div>
                            Hang tight! We're securely processing your payment
                        </div>

            
                        <div>
                            <LoaderCircle className="animate-spin h-24 w-24 text-primary" />
                        </div>


                        <div className="flex justify-center gap-2">
                            <span
                                className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce"
                            />
                            <span
                                className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce"
                            />
                            <span
                                className="w-2.5 h-2.5 bg-accent rounded-full animate-bounce"
                            />
                        </div>

                    </>
                ) : (
                    <>
                        <Check className="w-24 h-24 text-green-400"/>
                        
                        <div className="text-3xl font-bold">
                            Order Placed Successfully!
                        </div>

                        <div className="border rounded-lg  bg-primary text-white flex flex-col items-center justify-center p-4">
                            <div className="text-white ">Order ID</div>
                            <div className="text-lg font-semibold">{OrderId}</div>
                        </div>

                        <div>
                            Thank you for your purchase! Your order has been confirmed.
                        </div>

                        <div className="text-sm">
                            Redirecting to homepage in <span className="text-primary">{countdownTimer}</span> seconds...
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
}