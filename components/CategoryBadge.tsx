import { transactionCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";
import React from "react";

const CategoryBadge = ({ category }: { category: string }) => {
  const { backgroundColor, borderColor, chipBackgroundColor, textColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;
  return (
    <div
      className={cn(
        " flex items-center justify-center truncate w-fit gap-1 rounded-2xl border-[1.5px] py-[2px] pl-1.5 pr-2",
        borderColor,
        chipBackgroundColor
      )}
    >
      <div className={cn("size-2 rounded-full", backgroundColor)}></div>
      <p className={cn("text-xs font-medium", textColor)}>{category}</p>
    </div>
  );
};

export default CategoryBadge;
