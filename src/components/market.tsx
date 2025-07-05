import { Input } from "./ui/input";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function Market() {
  const warehouse = [...Array(9).keys()];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full gap-5">
        <div className="flex flex-row gap-5 ">
          <div className="relative w-full flex-[3_1_0%]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 " />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 flex-3 bg-muted text-muted-foreground"
            />
          </div>

          <Button className="bg-primary flex-1">Search</Button>
        </div>

        <div className="flex flex-row items-center justify-between w-full border">
          <div>
            <span className="text-2xl font-medium mr-1">Product Results</span>
            <span className="text-muted-foreground">101 Products</span>
          </div>

          <div className="flex flex-row ">
            <span className="mr-1">Sort By :</span>
            <div className="text-primary flex flex-row">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger>Default</DropdownMenuTrigger>
                <div>{isOpen ? <ChevronDown /> : <ChevronRight />}</div>
                <DropdownMenuContent>
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Rating: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Discount: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Alphabetical (A-Z)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 w-full gap-5">
          {warehouse.map((item) => (
            <Card>
              <CardContent>
                <div className="flex flex-row justify-between items-center">
                  <CardTitle className="text-xl font-bold">
                    Card Title
                  </CardTitle>
                  <div className="relative">
                    <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></Heart>
                    <Button className="bg-muted h-5 w-5"></Button>
                  </div>
                </div>
                <CardDescription>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
                  consequuntur necessitatibus reiciendis magnam ut tempora
                  doloremque, pariatur distinctio fuga amet unde aspernatur
                  mollitia iste ex vel. Quos ullam aspernatur sunt.
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-row justify-between">
                <span className="text-3xl font-bold">$345</span>
                <Button className="text-xl h-10 w-10">+</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="w-full flex justify-end">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
