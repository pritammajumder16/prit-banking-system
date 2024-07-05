"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

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
        <SheetContent side={"left"} className="border-none bg-white ">
          <nav className="flex flex-col ">
            <Link
              href="/"
              className="md:mb-12 cursor-pointer items-center gap-1 px-4 md:px-0 md:gap-2 flex"
            >
              <Image
                src={"/icons/logo.svg"}
                width={34}
                height={34}
                alt="Logo"
                className="md:size-[24px] max-xl:size-14"
              />
              <span className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1 block">
                Horizon
              </span>
            </Link>
            <div className="flex h-[calc(100vh-100px)] flex-col justify-between overflow-y-auto;">
              <SheetClose asChild>
                <nav className="flex flex-1 flex-col gap-6 pt-16 text-white">
                  {sidebarLinks?.map((item) => {
                    const isActive =
                      pathName === item.route ||
                      pathName.startsWith(`${item.route}`);
                    return (
                      <SheetClose asChild key={item.label}>
                        <Link
                          className={cn(
                            "flex gap-3 items-center p-4 rounded-lg w-full max-w-60",
                            { " bg-bankGradient": isActive }
                          )}
                          href={item.route}
                        >
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({
                              " brightness-[3] invert-0": isActive,
                            })}
                          />
                          <p
                            className={cn(
                              "text-16 font-semibold text-black-2",
                              { " !text-white": isActive }
                            )}
                          >
                            {item.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  USER
                </nav>
              </SheetClose>
              FOOTER
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
