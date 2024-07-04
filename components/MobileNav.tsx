"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainNavContent from "./MainNavContent";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathName = usePathname();
  return (
    <section className="w-full">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            alt={"menu"}
            className="cursor-pointer"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <MainNavContent />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
