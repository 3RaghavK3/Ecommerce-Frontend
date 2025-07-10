import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useState,useEffect } from "react";
import { FilterCondition } from "./ui/filter";
export function FilterColumn() {
    const [Category,setCategory]=useState([]);
   useEffect(()=>{
        fetch('http://localhost:3000/filters')
        .then((res)=>res.json())
        .then((x)=>{
              console.log(x)
              setCategory(x.data.map((details)=>details.name))
        }
        )
    },[])


  return (
    <Card className="w-75 h-max px-3">
      <CardHeader className="w-full p-0">
        <CardTitle className="flex flex-row justify-between">
          <div>Filter</div>
          <div className="text-primary">Clear All</div>
        </CardTitle>
      </CardHeader>

      <CardContent className=" p-0 flex flex-col gap-5">
        <FilterCondition title={"Category"} options={Category} onclick={(e)=>{}}  />
      </CardContent>
    </Card>
  );
}
