import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export function Productcard({
  id,
  title,
  description,
  price,
  images,
}: {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Card
        className="h-full"
        onClick={() => {
          navigate(`product/getInfo/${id}`);
        }}
      >
        <CardContent>
          <div>
            {!isImageLoaded && <Skeleton className="h-70 bg-muted" />}
            <img
              src={images?.[0]}
              className="h-70"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <span className="text-3xl font-bold">${price}</span>
          <Button className="text-xl h-10 w-10"><ShoppingCart/></Button>
        </CardFooter>
      </Card>
    </>
  );
}
