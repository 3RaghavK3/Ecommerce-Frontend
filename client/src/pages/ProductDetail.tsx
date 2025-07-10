import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import Rating from "react-rating";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TabsComponent from "@/components/tabs";

export function ProductDetailPage({}) {
  const { id } = useParams();
  const [productInfo, setproductInfo] = useState({});
  const [quantity, setquantity] = useState(1);


  useEffect(() => {
    fetch(`http://localhost:3000/products/getinfo?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setproductInfo(data.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((e) => console.error(e));
  }, [id]);

  return (
    <>
      <Header />
      <div className="min-h-screen w-full px-30">
        <div
          className="w-full text-sm text-muted-foreground my-15"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span>{`${productInfo.brand}/`}</span>
          <span>{`${productInfo.category}/`}</span>
          <span>{productInfo.title}</span>
        </div>

        <div className="shadow-xl">
          <div className="flex flex-row w-full h-[500px]">
            <div className="flex-1 flex items-center justify-center">
               
                    {productInfo?.images?.[0] && (
                    <img
                        src={productInfo.images[0]}
                        alt="Product"
                        className="w-full h-full object-contain"
                        onLoad={() => setIsImageLoaded(true)}
                    />
                    )}

            </div>

            <div
              className="flex-1 flex flex-col gap-5 px-10"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <div>
                <div
                  className="text-3xl font-extrabold"
                  style={{ fontFamily: "Archivo, sans-serif" }}
                >
                  {productInfo.title}
                </div>

                <div className="flex flex-row justify-between w-full items-center">
                  <div className="text-xl">By {productInfo.brand}</div>
                  <div className="bg-accent text-white rounded-lg p-1 font-semibold">
                    {productInfo.discountPercentage}% Discount
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-3/5 justify-between items-center text-muted-foreground">
                <div className="flex flex-row gap-2">
                  <div className="font-bold text-black">
                    {productInfo.rating}
                  </div>
                  <div>
                    <Rating
                      initialRating={productInfo.rating}
                      readonly
                      emptySymbol={<Star fill="#d4d4d8" stroke="none" />}
                      fullSymbol={<Star fill="#F3C63F" stroke="none" />}
                    />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-black">
                    {productInfo.reviews?.length}
                  </span>{" "}
                  Reviews
                </div>
                <div>
                  <span className="font-bold text-black">
                    {productInfo.stock}
                  </span>{" "}
                  Stock
                </div>
              </div>

              <div className="text-5xl font-bold text-black">
                ${productInfo.price}
              </div>

              <div className="grid w-full gap-3">
                <Label htmlFor="message" className="text-base">
                  Delivery Address
                </Label>
                <Textarea placeholder="Type your address here." id="message" />
              </div>

              <div>
                <div>Quantity</div>
                <div className="flex flex-row gap-2.5">
                  <Button onClick={() => setquantity(quantity - 1)}>-</Button>
                  <Button>{quantity}</Button>
                  <Button onClick={() => setquantity(quantity + 1)}>+</Button>
                </div>
              </div>

              <div className="w-full flex flex-row gap-5">
                <Button className="flex-1 text-primary border border-primary bg-background p-5 hover:bg-muted">
                  <ShoppingCart />
                  <span>Add to Cart</span>
                </Button>
                <Button className="flex-1 p-5">Check Out</Button>
              </div>
            </div>
          </div>
          <div className="px-10">
            {" "}
            <TabsComponent productInfo={productInfo} />
          </div>
        </div>
      </div>
    </>
  );
}
