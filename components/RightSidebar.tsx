import Image from "next/image";
import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";
import { countTransactionCategories } from "@/utils/functions";
import Category from "./Category";

const RightSidebar = ({ user, transactions, accounts }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  return (
    <div className="no-scrollbar min-w-fit h-fit hidden min-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] overflow-y-scroll  ">
      <section className="flex flex-col pb-4 ">
        <div className="h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat">
          <div className=" flex px-6 max-xl:justify-center">
            <div className="flex items-center justify-center relative top-16 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile">
              <span className="text-5xl font-bold text-blue-500">
                {user?.firstName?.[0]}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="banks">
        <div className="flex flex-col">
          <span className="text-24 font-semibold text-gray-900">
            {user?.firstName} {user?.lastName}
          </span>
          <p className="text-16 font-normal text-gray-600">{user?.email}</p>
        </div>
        <div className="flex w-full justify-between">
          <span className="text-lg font-semibold text-gray-900"> My banks</span>
          <Link href={"/"} className="flex gap-2 items-center">
            <Image width={20} height={20} alt="plus" src={"/icons/plus.svg"} />
            <span className="text-14 font-semibold text-gray-600">
              Add bank
            </span>
          </Link>
        </div>
        {accounts?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-20">
              <BankCard
                key={accounts[0].id}
                account={accounts[0]}
                userName={`${user?.firstName} ${user?.lastName}`}
                showBalance={false}
              />
            </div>
            {accounts[1] && (
              <div className="absolute right-0 top-8 z-10">
                <BankCard
                  key={accounts[0].id}
                  account={accounts[0]}
                  userName={`${user?.firstName} ${user?.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
        <div className="mt-10 flex flex-1 flex-col gap-6">
          <span className="">Top categories</span>
          <div className="space-y-5">
            {categories.map((category, index) => {
              return <Category key={category.name} category={category} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RightSidebar;
