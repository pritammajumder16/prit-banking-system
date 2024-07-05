import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link href={"/"} className="bank-card">
        <div className="bank-card_content">
          <div>
            <span className="text-16 font-semibold text-white">
              {account.name || userName}
            </span>
            <p className="font-ibm-plex-serif font-black text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-12 font-semibold text-white">
                {userName}
              </span>

              <span className="text-12 font-semibold text-white">◍◍/◍◍</span>
            </div>
            <span className="text-14 font-semibold tracking-[1.1px] text-white">
              ◍◍◍◍ ◍◍◍◍ ◍◍◍◍ {1234} {account.mask}
            </span>
          </article>
        </div>
        <div className="bank-card_icon">
          <Image
            src={"/icons/Paypass.svg"}
            alt={"pay"}
            width={20}
            height={24}
          />
          <Image
            src={"/icons/mastercard.svg"}
            alt={"mastercard"}
            width={45}
            height={32}
          />
        </div>
        <Image
          src={"/icons/lines.png"}
          alt={"lines"}
          width={316}
          height={190}
          className=" ml-5"
        />
      </Link>
    </div>
  );
};

export default BankCard;
