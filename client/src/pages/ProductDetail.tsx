import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import Rating from "react-rating";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import TabsComponent from "@/components/tabs";
import { Productcard } from "@/components/ProductCard";
import { DialogContext } from "@/context/DialogContext";
import { MarketContext } from "@/context/MarketContext";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { AlertDialog } = useContext(DialogContext);
  const [productInfo, setProductInfo] = useState({});
  const [recommendended, setRecommended] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [stockAvail, setStockAvail] = useState(true);
  const {AddToCart}=useContext(MarketContext)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`${import.meta.env.VITE_API_URL}/products/getinfo?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductInfo(data.data);
        setStockAvail(data.data.stock > 0);
      })
      .catch((e) => console.error(e));

    fetch(
      `${import.meta.env.VITE_ML_URL}/recommend-products?product_id=${id}&num_recommendations=3`
    )
      .then((res) => res.json())
      .then((x) => setRecommended(x))
      .catch((e) => console.error(e));
  }, [id]);


  //cart={
  // items:[{},{}],
  // totalq=<number>,
  // totalbill=<number>,
  
  

  return (
    <>
      <Header />
      <div className="min-h-screen w-full px-4 md:px-10 border-2 lg:px-50  m-0">
        <div
          className="w-full text-sm text-muted-foreground mt-8"
        >
          <span>{`${productInfo.brand}/`}</span>
          <span>{`${productInfo.category}/`}</span>
          <span>{productInfo.title}</span>
        </div>

        <div className="shadow-xl">
          <div className="flex flex-col md:flex-row w-full h-fit">
        
            <div className="flex-1 flex items-center justify-center">
              {productInfo?.images?.[0] && (
                <img
                  src={productInfo.images[0]}
                  alt="Product"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

          
            <div className="flex-1 flex flex-col gap-5 px-10 p-4">
              <div>
                <div className="flex justify-between ">
                    <div
                  className="text-lg md:text-lg lg:text-2xl font-extrabold">
                  {productInfo.title}
                  </div>
                  <div className="bg-accent hidden lg:block text-white flex items-center rounded-sm p-1">
                    {productInfo.discountPercentage}% Discount
                  </div>
                </div>
              
      
                {productInfo.brand && (<div>By {productInfo.brand}</div>)}
                <span className="bg-accent lg:hidden text-white flex items-center rounded-sm p-1 w-fit">
                    {productInfo.discountPercentage}% Discount
                  </span>
                  
              </div>

              <div className="flex flex-row text-sm justify-between items-center text-muted-foreground">
                

                  <div className="flex flex-1 justify-between lg:gap-2">
                    <div className="gap-2 hidden lg:flex">
                    <div className="font-bold text-black">{productInfo.rating}</div>
                    <div className="">Rating</div>
                    
                      <Rating
                      initialRating={productInfo.rating}
                      readonly
                      emptySymbol={<Star fill="#d4d4d8" stroke="none" />}
                      fullSymbol={<Star fill="#F3C63F" stroke="none" />}/>
                  </div>

                  <div className=" lg:hidden flex gap-1 text-black">
                    <span className="font-bold ">{productInfo.rating}</span>Rating</div>
        
                      <div className="flex gap-1 text-black">
                    <span className="font-bold">
                      {productInfo.reviews?.length}
                    </span>Reviews
                  </div>
                  <div>
                    <span className="font-bold text-black">{productInfo.stock}</span>{" "}
                    Stock
                  </div>
                </div>
                
              </div>

              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">${productInfo.price}</div>
              <div className="text-sm md:text-base">{productInfo.description}</div>


              <div className="flex flex-col gap-5">
                {!stockAvail && (
                  <div className="text-red-500 font-semibold">
                    Out of Stock! Come back Later
                  </div>
                )}
                {stockAvail && (
                  <>
                    <div className="flex gap-2.5 items-center">
                      Quantity
                      <Button
                        onClick={() => {
                          if (quantity > 1) setQuantity(quantity - 1);
                          else
                            AlertDialog({
                              msg: "Minimum Quantity Reached",
                              desc: "You cannot select less than 1 item",
                            });
                        }}
                      >
                        -
                      </Button>
                      <Button>{quantity}</Button>
                      <Button
                        onClick={() => {
                          if (quantity < productInfo.stock) setQuantity(quantity + 1);
                          else
                            AlertDialog({
                              msg: "Maximum Stock Reached",
                              desc: `You cannot select more than ${productInfo.stock} items.`,
                            });
                        }}
                      >
                        +
                      </Button>
                    </div>

                    <div className="w-full flex flex-row gap-5 mt-5">
                      <Button
                        className="flex-1 text-primary border border-primary bg-background p-5 hover:bg-muted"
                        onClick={()=>AddToCart(productInfo,quantity)}
                      >
                        <ShoppingCart />
                        <span className="">Add to Cart</span>
                      </Button>
                      <Button
                        className="flex-1 p-5"
                        onClick={() => navigate("/checkout")}
                      >
                        Check Out
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

  
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold px-8 mt-10">Recommended Products</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8">
            {recommendended.map((item) => (
              <Productcard key={item.id} {...item} />
            ))}
          </div>

        
          <div className="px-10">
            <TabsComponent productInfo={productInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
