"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavContent = () => {
  const pathName = usePathname();
  return (
    <nav className="flex flex-col gap-4">
      <Link href="/" className="mb-12 cursor-pointer items-center gap-2 flex">
        <Image
          src={"/icons/logo.svg"}
          width={34}
          height={34}
          alt="Logo"
          className="size-[24px] max-xl:size-14"
        />
        <span className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden">
          Horizon
        </span>
      </Link>
      {sidebarLinks?.map((item) => {
        const isActive =
          pathName === item.route || pathName.startsWith(`${item.route}`);
        return (
          <Link
            className={cn(
              "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
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
                "text-16 font-semibold text-black-2 max-xl:hidden",
                { " !text-white": isActive }
              )}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
      USER
    </nav>
  );
};

export default MainNavContent;
