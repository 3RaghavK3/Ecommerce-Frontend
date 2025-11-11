import { useNavigate, useParams } from "react-router-dom";

export function Cartbuilder({ cart = { items: [], totalq: 0, totalbill: 0 } }) {
    const navigate = useNavigate();
    const { orderId } = useParams();

    let object;

    if (orderId) {
        const placeorders = JSON.parse(localStorage.getItem("PlacedOrders") || '[]');
        object = placeorders[placeorders.findIndex(p=> orderId == p.OrderId)]
        cart=object.details
    }

    return (
        <>
        <div className={`${orderId?'px-24 py-12':''}`}>

            {orderId
            ?(<div className="flex justify-between">
                             <div className="font-bold text-2xl mb-4">Date:{object.Date}</div>
                            <div className="font-bold text-2xl mb-4">OrderId:{orderId}</div>
                            <div className="font-bold text-2xl mb-4">Time:{object.Time}</div>
            </div>
                
            )
            :(<div></div>)}
           
        
        <div>
                <div className="flex flex-col border-2 border-black p-4 rounded-xl">
               
                <div className="grid grid-cols-5 gap-2 overflow-y-auto p-4 my-2  border-2 bg-primary/15">
                    <div className="flex justify-left items-center text-xl font-semibold">Product</div>
                    <div className="flex justify-left items-center text-xl pl-4 font-semibold">Title</div>
                    <div className="flex justify-left items-center text-xl font-semibold">Price</div>
                    <div className="flex justify-left items-center text-xl font-semibold">Quantity</div>
                    <div className="flex justify-left items-center text-xl font-semibold">Subtotal</div>
                </div>

               
                {cart.items.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-5 gap-2 overflow-y-auto p-4 my-2 bg-accent/15 rounded-xl"
                    >
                        <div className="flex justify-left h-24 w-24 bg-muted rounded-lg border">
                            <img src={item.images[0] || "-"} alt={item.title} />
                        </div>
                        <div className="flex flex-col justify-center p-4">
                            <div className="flex justify-left items-center font-bold text-xl">{item.title || "-"}</div>
                            {item.brand?(<div className="flex justify-left items-center text-xl">{item.brand || "-"}</div>):''}
                        </div>

                        <div className="flex justify-left items-center text-2xl">${item.price || "-"}</div>
                        <div className="flex justify-left items-center text-2xl ">{item.quantity || "-"}</div>
                        <div className="flex justify-left items-center text-2xl ">${Number(item.subtotal).toFixed(2) || "-"}</div>
                    </div>
                ))}


                <div className="grid grid-cols-5 gap-2 overflow-y-auto my-1 p-4 rounded-xl">
                        {orderId ? (
                    <div
                        className="text-left text-xl cursor-pointer bg-primary text-white p-3 rounded-lg flex items-center justify-left"
                        onClick={() => navigate('/pastOrders')}
                    >
                        Back
                    </div>
                ) : (
                    <div
                        className="text-left text-xl cursor-pointer bg-primary text-white p-3 rounded-lg flex items-center justify-left"
                        onClick={() => navigate('/')}
                    >
                        Update Cart
                    </div>
                )}

                <div></div>
                <div></div>
                <div className="text-2xl bg-black rounded-lg text-white flex items-center justify-left pl-4 ">
                    Quantity: {cart.totalq}
                </div>
                <div className="text-2xl bg-black rounded-lg text-white flex items-center justify-left pl-4 ">
                    Bill: ${Number(cart.totalbill).toFixed(2)}
                </div>
                </div>
               
                
            </div>
        </div>
            
        </div>
        
        </>
    );
}
