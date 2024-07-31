import { formatAmount } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Copy from "./Copy";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history?id=${account.bank._id}`}
        className="relative flex h-48 w-full max-w-[320px] justify-between rounded-[20px] border border-white bg-bank-gradient shadow-creditCard backdrop-blur-[6px] "
      >
        <div className="relative z-10 flex size-full  flex-col justify-between rounded-l-[20px]  bg-bank-gradient px-5 pb-4 pt-5">
          <div>
            <span className="text-base whitespace-nowrap font-semibold text-white">
              {account.name || userName}
            </span>
            <p className="font-ibm-plex-serif font-black text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-white">
                {userName}
              </span>

              <span className="text-xs font-semibold text-white">●●/●●</span>
            </div>
            <span className=" text-sm whitespace-nowrap font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-base">{account.mask}</span>
            </span>
          </div>
        </div>
        <div className="flex size-full flex-col items-end justify-between rounded-r-[20px] bg-bank-gradient bg-cover bg-center bg-no-repeat py-5  pr-5 ">
          <Image
            src={"/icons/Paypass.svg"}
            alt={"pay"}
            className="size-8"
            width={20}
            height={24}
          />
          <Image
            src={"/icons/mastercard.svg"}
            alt={"mastercard"}
            width={45}
            className="ml-1"
            height={32}
          />
        </div>
        <Image
          src={"/icons/lines.svg"}
          alt={"lines"}
          width={316}
          height={190}
          className="absolute top-0 left-0"
        />
      </Link>
      {showBalance && <Copy title={account?.sharableId} />}
    </div>
  );
};

export default BankCard;
