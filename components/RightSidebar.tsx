import Image from "next/image";
import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";

const RightSidebar = ({
  user,
  transactions,
  accounts,
  banks,
}: RightSidebarProps) => {
  return (
    <div className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll ">
      <section className="flex flex-col pb-20 ">
        <div className="h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat">
          <div className=" flex px-6 max-xl:justify-center">
            <div className="flex-center absolute top-16 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile">
              <span className="text-5xl font-bold text-blue-500">
                {user?.firstName?.[0]}
              </span>
            </div>
            <div className="flex flex-col mt-40">
              <span className="text-24 font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </span>
              <p className="text-16 font-normal text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="banks">
        <div className="flex w-full justify-between">
          <span className="text-lg font-semibold text-gray-900"> My banks</span>
          <Link href={"/"} className="flex gap-2 items-center">
            <Image width={20} height={20} alt="plus" src={"/icons/plus.svg"} />
            <span className="text-14 font-semibold text-gray-600">
              Add bank
            </span>
          </Link>
        </div>
        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-20">
              <BankCard
                key={banks[0]._id}
                account={accounts[0]}
                userName={`${user?.firstName} ${user?.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-10">
                <BankCard
                  key={banks[0]._id}
                  account={accounts[0]}
                  userName={`${user?.firstName} ${user?.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default RightSidebar;
