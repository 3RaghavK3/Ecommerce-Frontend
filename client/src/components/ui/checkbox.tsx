import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { MarketContext } from "@/context/MarketContext";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  condition,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const {
    market,
    setmarket,
    totalProducts,
    settotalproducts,
    totalPages,
    page,
    setpage,
    categoryItems,
    setCategoryItems,
  } = React.useContext(MarketContext);
  const isfilterselected = categoryItems.includes(condition);

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      checked={isfilterselected}
      onCheckedChange={(val) => {
        if (val) {
          setCategoryItems((prev) => [...prev, condition]);
        } else {
          setCategoryItems((prev) => prev.filter((x) => x !== condition));
        }
        setpage(1);
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
