
import { useNavigate, useParams } from "react-router-dom";

export function Cartbuilder({ cart = { items: [], totalq: 0, totalbill: 0 } }) {
  const navigate = useNavigate();
  const { orderId } = useParams();

  let object;

  if (orderId) {
    const placeorders = JSON.parse(
      localStorage.getItem("PlacedOrders") || "[]",
    );
    object = placeorders[placeorders.findIndex((p) => orderId == p.OrderId)];
    cart = object.details;
  }

  return (
    <>
      <div className={`${orderId ? "p-10 md:px-24  md:py-12 bg-[#f3f3f3]/25 min-h-screen" : ""}`}>
        {orderId ? (
          <div className="flex flex-col md:flex-row justify-between font-bold  mb-4 text-sm md:text-base lg:text-xl">
            <div className="">Date:{object.Date}</div>
            <div className="">OrderId:{orderId}</div>
            <div className="">Time:{object.Time}</div>
          </div>
        ) : (
          <div></div>
        )}

        <div>
          <div className="flex flex-col shadow-lg bg-white p-4 max-h-[70vh] lg:max-h-[85vh] w-full">
            <div className="font-bold">ORDER SUMMARY | {cart.totalq} ITEMS</div>
            <div className="overflow-y-scroll">
              {cart.items.map((item, index) => (
                <div
                  key={index}
                  className="flex  p-1   text-sm md:text-base lg:text-base border-1"
                >
                  <div className="flex  justify-left  bg-muted rounded-lg border h-16 w-16 lg:h-32 lg:w-32">
                    <img src={item.images[0] || "-"} alt={item.title} />
                  </div>
                  <div className="flex flex-col flex-1 justify-between px-4">
                    <div className="flex flex-col">
                      <div className="flex justify-left items-center font-bold ">
                        {item.title || "-"}
                      </div>
                      {item.brand ? (
                        <div className="flex justify-left items-center font-normal">
                          {item.brand || "-"}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="flex justify-left items-center ">
                        Price :${Number(item.price).toFixed(2) || "-"}
                      </div>
                    </div>
                    <div className="flex justify-between flex-col lg:flex-row">
                      <div className="flex justify-left items-center ">
                        Qty: {item.quantity || "-"}
                      </div>
                      <div className="flex justify-left items-center ">
                        Subtotal: ${Number(item.subtotal).toFixed(2) || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2">
              <div className="text-sm md:text-base flex justify-between p-2">
                <span>Bill:</span>
                <span>${Number(cart.totalbill).toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-2 rounded-xl">
                {orderId ? (
                  <div
                    className="text-left  cursor-pointer bg-primary text-white p-2 rounded-lg flex items-center justify-center"
                    onClick={() => navigate("/pastOrders")}
                  >
                    Back
                  </div>
                ) : (
                  <>
                    <div
                      className="text-left  cursor-pointer bg-accent text-lg text-white p-2 flex items-center justify-center"
                      onClick={() => navigate("/payment")}
                    >
                      Proceed to Pay
                    </div>
                    <div
                      className="text-left  cursor-pointer border-2 border-primary text-lg text-primary p-2 flex items-center justify-center"
                      onClick={() => navigate("/")}
                    >
                      Continue Shopping
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
