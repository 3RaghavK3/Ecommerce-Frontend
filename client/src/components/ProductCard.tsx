import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";

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
              src={images[0]}
              className="h-70"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <div className="relative">
              <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></Heart>
              <Button className="bg-muted h-5 w-5"></Button>
            </div>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <span className="text-3xl font-bold">${price}</span>
          <Button className="text-xl h-10 w-10">+</Button>
        </CardFooter>
      </Card>
    </>
  );
}
