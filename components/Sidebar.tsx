import React from "react";
import MainNavContent from "./MainNavContent";
import Link from "next/link";
import Image from "next/image";
import PlaidLink from "./PlaidLink";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
  return (
    <section className="sticky left-0 top-0 sm:flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white hidden p-4   2xl:w-[270px]">
      <nav className="flex flex-col gap-4 ">
        <Link
          href="/"
          className="lg:mb-12 cursor-pointer items-center gap-1 px-4 lg:px-0 lg:gap-2 flex"
        >
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Logo"
            className="lg:size-[24px] size-14"
          />
          <span className="  font-ibm-plex-serif text-[26px] font-bold text-black-1 lg:block hidden">
            Prit
          </span>
        </Link>
        <MainNavContent />
        <PlaidLink user={user} />
      </nav>

      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
