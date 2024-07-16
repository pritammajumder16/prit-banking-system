"use client";
import { useState } from "react";

import { Button } from "./ui/button";
import TickSvg from "@/assets/ComponentSvg/TickSvg";
import CopySvg from "@/assets/ComponentSvg/CopySvg";

const Copy = ({ title }: { title: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <Button
      data-state="closed"
      className="mt-3 flex max-w-[320px] gap-4"
      variant="secondary"
      onClick={copyToClipboard}
    >
      <p className="line-clamp-1 w-full max-w-full text-xs font-medium text-black-2">
        {title}
      </p>

      {!hasCopied ? <CopySvg /> : <TickSvg />}
    </Button>
  );
};

export default Copy;
