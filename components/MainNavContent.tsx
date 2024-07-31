"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavContent = () => {
  const pathName = usePathname();
  return (
    <>
      {sidebarLinks?.map((item) => {
        const isActive = pathName === item.route;
        return (
          <Link
            className={cn(
              "flex gap-3 items-center py-1 lg:p-3  p-4 rounded-lg justify-center lg:justify-start",
              { " bg-bankGradient": isActive }
            )}
            href={item.route}
            key={item.label}
          >
            <div className="relative size-6">
              <Image
                src={item.imgURL}
                alt={item.label}
                fill
                className={cn({ " brightness-[3] invert-0": isActive })}
              />
            </div>
            <p
              className={cn(
                "text-16 font-semibold text-black-2 hidden lg:block",
                {
                  " !text-white": isActive,
                }
              )}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default MainNavContent;
