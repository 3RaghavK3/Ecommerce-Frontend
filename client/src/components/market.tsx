import { Input } from "./ui/input";
import { ChevronDown, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "./ui/button";
import { History } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { Productcard } from "./ProductCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MarketContext } from "@/context/MarketContext";
import { useNavigate } from "react-router-dom";
export default function Market() {
  const {
    market,
    setmarket,
    totalProducts,
    settotalproducts,
    totalPages,
    page,
    setpage,
    limit,
    categoryItems,
    setCategoryItems,
    sort,
    setSort,
    open,
    setOpen
  } = useContext(MarketContext);
  const [isOpen, setIsOpen] = useState(false);
  const UserSearch = useRef(null);
  const multiplemarket = useRef([]);
  const [inputvalue,setinput]=useState("");
  const [history,sethistory]=useState({store:[],show:false});

  const no_of_history=3;
  const navigate=useNavigate();

  const changehistory = () => {
      sethistory(prev=>({...prev,store:[UserSearch.current?.value, ...prev.store].slice(0,no_of_history)}))
  }
  console.log(import.meta.env.VITE_API_URL)

  const showhistory=()=>
      history.store.map((searchq)=>

      <div className="h-8 bg-secondary px-4 border-1 text-muted-foreground flex items-center cursor-pointer z-10 text-sm lg:text-sm" onMouseDown={(e) => {
    e.preventDefault();   
    UserSearch.current.value = searchq;
    setinput(searchq);
    setCategoryItems([]);
    setpage(1);
    sethistory(prev => ({ ...prev, show: false }));
  }}>
          <History className="relative -left-2 h-5 w-5"/>
          {searchq}
      </div>)
  

  async function repeatedFetch() {
    try {
      multiplemarket.current = [];
      let totalsum = 0;

      for (let index = 0; index < categoryItems.length; index++) {
        const category = categoryItems[index];

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/filter/categories?category=${category}`,
        );
        const res = await response.json();
  
        res.data.forEach((product) => multiplemarket.current.push(product));
        settotalproducts((prev) =>
          index === 0 ? res.total : prev + res.total,
        );

        totalsum += res.total;
      }
      totalPages.current = Math.ceil(totalsum / limit);
      setmarket(
        multiplemarket.current.slice(
          limit * (page - 1),
          limit * (page - 1) + limit,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
  let url = "";

  if (categoryItems.length === 0) {
    if (inputvalue.length > 0) {
      changehistory(); // call it as a normal statement
      url = `${import.meta.env.VITE_API_URL}/searchq?inputvalue=${inputvalue}&page=${page}&sortstate=${sort}`;
    } else {
      url = `${import.meta.env.VITE_API_URL}/products?page=${page}&sortstate=${sort}`;
    }
  } else if (categoryItems.length === 1) {
    setinput("");
    if (UserSearch.current) UserSearch.current.value = "";
    url = `${import.meta.env.VITE_API_URL}/filter/category?category=${categoryItems[0]}&page=${page}&sortstate=${sort}`;
  } else {
    setmarket(
      multiplemarket.current.slice(
        limit * (page - 1),
        limit * (page - 1) + limit
      )
    );
    return;
  }

  fetch(url)
    .then((res) => res.json())
    .then((x) => {
      setmarket(x.data);
      settotalproducts(x.total);
      totalPages.current = Math.ceil(x.total / limit);
    })
    .catch((err) => console.error("Failed to fetch products:", err));
}, [sort, page, categoryItems.length, inputvalue]);


  useEffect(() => {
    if (categoryItems.length > 1) repeatedFetch();
  }, [categoryItems.length]);



  return (
    <>
      
      <div className="flex flex-col w-full gap-5 text-sm md:text-base lg:text-lg">
        <div className="flex flex-row b justify-between items-center">
          <div className="w-5 h-5 md:w-6 md:h-6 flex items-center lg:hidden" onClick={()=>setOpen(true)} >
             <SlidersHorizontal/>
          </div>
          <div className="md:w-3/5 flex flex-col focus:ring-offset-0 ">
            <Input
              ref={UserSearch}
              type="text"
              placeholder="Search..."
              className="pl-5 flex-3 bg-muted"
              onFocus={()=>{sethistory(prev=>({...prev,show:true}))}
            }      
              onBlur={() => sethistory(prev => ({ ...prev, show: false }))}
            />
      
           {history.show && <div className="mt-2">
                  <div className="absolute flex flex-col">{showhistory()}</div>
            </div>
}
          </div>
          

          <div className="flex justify-between items-center gap-2 md:gap-3 lg:gap-5 ">
            <Button
            className="bg-primary px-3 py-0 md:px-8 lg:px-12 "
            onClick={() => {
              setinput(UserSearch.current?.value);
              setCategoryItems([]);
              setpage(1);
            }}
          >
            Search
          </Button>
           <ShoppingCart  onClick={()=>navigate("/checkout")}  className="cursor-pointer text-black w-6 h-6 md:w-7 md:h-7"/>
            <Avatar  className="cursor-pointer w-6 h-6  md:w-7 md:h-7" onClick={()=>navigate("/pastOrders")}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
      </Avatar> 
          </div>
    
        </div>

        <div>
          
        </div>
        <div className="flex flex-row relative justify-between w-full">
          <div>
            <span className="mr-1">Product Results</span>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
          {market?.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="w-full ">
              <Productcard {...item} />
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end">
          <div >
            <Pagination>
              <PaginationContent className="cursor-pointer">
                <PaginationItem >
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