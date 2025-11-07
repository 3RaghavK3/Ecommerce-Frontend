import { Input } from "./ui/input";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Productcard } from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Market() {
  const [isOpen, setIsOpen] = useState(false);
  const [market, setmarket] = useState([]);
  const [totalProducts, settotalproducts] = useState(0);
  const [page, setpage] = useState(1);
  const [sort, setSort] = useState("default");
  const [inputValue, setInputValue] = useState("");
  const UserSearch = useRef(null);
  const totalPages = useRef(null);
  const limit = Number(import.meta.env.VITE_PER_PAGE) || 9;

  useEffect(() => {
    fetch(
      `http://localhost:3000/products?page=${page}&sortstate=${sort}&userquery=${inputValue}`,
    )
      .then((res) => res.json())
      .then((x) => {
        setmarket(x.data.products);
        settotalproducts(x.total);
        totalPages.current = Math.ceil(x.data.total / limit);

        window.scrollTo({
          top: 450,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, [page, sort, inputValue]);

  return (
    <>
      <div className="flex flex-col w-full gap-5">
        <div className="flex flex-row gap-5 ">
          <div className="relative w-full flex-[3_1_0%]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 " />
            <Input
              ref={UserSearch}
              type="text"
              placeholder="Search..."
              className="pl-10 flex-3 bg-muted text-muted-foreground"
            />
          </div>

          <Button
            className="bg-primary flex-1"
            onClick={() => {
              setInputValue(UserSearch.current?.value);
              setpage(1);
            }}
          >
            Search
          </Button>
        </div>

        <div className="flex flex-row  justify-between w-full ">
          <div>
            <span className="text-2xl font-medium mr-1">Product Results</span>
            <span className="text-muted-foreground">
              {totalProducts} Products
            </span>
          </div>

          <div className="flex flex-row items-center">
            <span className="mr-1">Sort By :</span>
            <div className="text-primary flex flex-row">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger>
                  {
                    {
                      default: "Category",
                      priceLowToHigh: "Price: Low to High",
                      priceHighToLow: "Price: High to Low",
                      ratingHighToLow: "Rating: High to Low",
                      discountHighToLow: "Discount: High to Low",
                      alphaasc: "Alphabetical(A-Z)",
                      alphadesc: "Alphabetical(Z-A)",
                    }[sort]
                  }
                </DropdownMenuTrigger>
                <div>{isOpen ? <ChevronDown /> : <ChevronRight />}</div>
                <DropdownMenuContent>
                  {Object.entries({
                    default: "Category",
                    priceLowToHigh: "Price: Low to High",
                    priceHighToLow: "Price: High to Low",
                    ratingHighToLow: "Rating: High to Low",
                    discountHighToLow: "Discount: High to Low",
                    alphaasc: "Alphabetical(A-Z)",
                    alphadesc: "Alphabetical(Z-A)",
                  }).map(([key, value]) => (
                    <DropdownMenuItem
                      key={key}
                      onSelect={() => {
                        setSort(key);
                      }}
                    >
                      {value}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 w-full gap-5 items-stretch">
          {market.map((item) => (
            <div key={item.id} className="w-full">
              <Productcard {...item} />
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={page === 1}
                    onClick={() => {
                      if (page > 1) setpage(page - 1);
                    }}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>

                {page + 1 <= Number(totalPages.current) && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setpage(page + 1)}>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {page + 2 <= Number(totalPages.current) && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setpage(page + 2)}>
                      {page + 2}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {Number(totalPages.current) - page > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    disabled={page === Number(totalPages.current)}
                    onClick={() => {
                      if (page < Number(totalPages.current)) setpage(page + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
