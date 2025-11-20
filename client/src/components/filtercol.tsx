import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useState, useEffect } from "react";
import { FilterCondition } from "./ui/filter";
import { useContext } from "react";
import { MarketContext } from "@/context/MarketContext";
import { X } from "lucide-react";
export function FilterColumn() {
  const [Category, setCategory] = useState([]);
  const { categoryItems, setCategoryItems, open, setOpen } =
    useContext(MarketContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/filters`)
      .then((res) => res.json())
      .then((x) => setCategory(x.data));
  }, []);

  return (
    <div
      className={`h-max absolute z-10 transition-transform ease-in-out lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto  lg:relative  lg:w-1/4  text-sm md:text-base 
      ${
        open
          ? "translate-x-0 opacity-100 pointer-events-auto md:translate-x-0 md:opacity-100 md:pointer-events-auto"
          : "-translate-x-1/2 opacity-0 pointer-events-none md:-translate-x-1/2 md:opacity-0 md:pointer-events-none"
      } `}
    >
      <Card className="p-3">
        <CardHeader className="w-full p-0">
          <CardTitle className="flex flex-row justify-between font-semibold items-center">
            <div>Filter</div>
            <div className="flex gap-5 items-center">
              <div
                className="text-primary cursor-pointer"
                onClick={() => setCategoryItems([])}>
                Clear All
              </div>
              <div className="lg:hidden" onClick={() => setOpen(false)}>
                <X />
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className=" p-0 flex flex-col gap-5">
          <FilterCondition title={"Category"} options={Category} />
        </CardContent>
      </Card>
    </div>
  );
}
