import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { FilterCondition } from "./ui/filter";
export function FilterColumn() {
  return (
    <Card className="w-75 h-max px-3">
      <CardHeader className="w-full p-0">
        <CardTitle className="flex flex-row justify-between">
          <div>Filter</div>
          <div className="text-primary">Clear All</div>
        </CardTitle>
      </CardHeader>

      <CardContent className=" p-0 flex flex-col gap-5">
        <FilterCondition title={"Price"} options={["1", "2", "3"]} />
        <FilterCondition title={"Rating"} options={["1", "2", "3"]} />
        <FilterCondition title={"Discount"} options={["1", "2", "3"]} />
        <FilterCondition title={"Category"} options={["1", "2", "3"]} />
      </CardContent>
    </Card>
  );
}
