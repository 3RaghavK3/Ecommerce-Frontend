import { useState } from "react";
import { AdditionalProductInfo } from "./ProductInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Rating from "react-rating";
import { Star } from "lucide-react";
export default function TabsComponent({ productInfo }) {
  const [selectedTab, setSelectedTab] = useState("description");

  const links = [];
  return (
    <div className="mt-10 text-sm md:text-base">
      <div className="flex border-b border-gray-300 text-sm font-semibold">
        <button
          onClick={() => setSelectedTab("description")}
          className={`px-4 py-2 ${
            selectedTab === "description"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-muted-foreground"
          }`}
        >
          Product Description
        </button>
        <button
          onClick={() => setSelectedTab("reviews")}
          className={`px-4 py-2 ${
            selectedTab === "reviews"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-muted-foreground"
          }`}
        >
          Reviews
        </button>
      </div>

      <div className="mt-5">
        {selectedTab === "description" && (
          <div className="px-2">
            <div className="text-sm text-muted-foreground  ">
              {productInfo.description}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3  py-10 text-sm text-muted-foreground">
              <AdditionalProductInfo productInfo={productInfo} />
            </div>
          </div>
        )}

        {selectedTab === "reviews" && (
          <div className="flex flex-col gap-10 pb-10">
            {productInfo.reviews.map((review) => {
              return (
                <div className="px-2 text-sm md:text-base">
                  <div className="flex flex-row items-center gap-2.5">
                    <div className="h-10 w-10">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/evilrabbit.png"
                          alt="@evilrabbit"
                          className="rounded-full"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold">{review.reviewerName}</div>
                        <div>{new Date(review.date).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <Rating
                          initialRating={review.rating}
                          readonly
                          emptySymbol={<Star fill="#d4d4d8" stroke="none" />}
                          fullSymbol={<Star fill="#F3C63F" stroke="none" />}
                        />
                      </div>
                    </div>
                  </div>
                  <div>{review.comment}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
