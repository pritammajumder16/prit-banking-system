"use client";
import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import Loading from "@/components/Loader";
import { getAccounts } from "@/lib/actions/bank.actions";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const MyBanks = () => {
  const loggedIn = useSelector((state: any) => {
    return state?.auth?.auth;
  });
  const stableLoggedIn = useMemo(() => loggedIn, [loggedIn?._id]);
  const [page, setPage] = useState<number>(1);
  const [accountsData, setAccountsData] = useState<TotlaBalanceBoxProps>();

  useEffect(() => {
    (async () => {
      const accountsResponse = await getAccounts({
        userId: stableLoggedIn._id,
      });

      setAccountsData(accountsResponse.data);
    })();
  }, [stableLoggedIn._id]);
  if (!stableLoggedIn || !accountsData) {
    return <Loading />;
  }
  return (
    <section className="flex">
      <div className="my-flex h-screen max-h-screen w-full flex-col gap-8 bg-gray-25 p-8 xl:py-12">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />
        <div className="space-y-4 mt-8">
          <span className="text-lg font-semibold text-gray-900">
            Your cards
          </span>
          <div className="flex flex-wrap gap-6">
            {accountsData &&
              accountsData.accounts.map((a: Account) => {
                return (
                  <BankCard
                    key={a.id}
                    account={a}
                    userName={stableLoggedIn?.firstName}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
