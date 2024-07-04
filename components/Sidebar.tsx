"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathName = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-2 flex">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Logo"
            className="size-[24px] max-xl:size-14"
          />
          <span className="sidebar-logo">Horizon</span>
        </Link>
        {sidebarLinks?.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}`);
          return (
            <Link
              className={cn("sidebar-link", { " bg-bankGradient": isActive })}
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
              <p className={cn("sidebar-label", { " !text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
        USER
      </nav>
      FOOTER
    </section>
  );
};

export default Sidebar;
