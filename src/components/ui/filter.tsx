import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";

interface FilterConditionProps {
  title: string;
  options: string[];
}

export function FilterCondition({ title, options = [] }: FilterConditionProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <Collapsible className="border-b-1">
        <CollapsibleTrigger
          className="font-bold mb-1  flex flex-row justify-between w-full"
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          <div>{title}</div>
          <div>{isClicked ? <ChevronDown /> : <ChevronRight />}</div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-1 ">
            {options.map((condition) => (
              <div className="flex flex-row gap-2 items-center">
                <Checkbox />
                {condition}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
