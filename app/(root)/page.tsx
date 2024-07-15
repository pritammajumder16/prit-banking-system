"use client";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const loggedIn = useSelector((state: any) => {
    return state?.auth?.auth;
  });
  const [accountsData, setAccountsData] = useState<TotlaBalanceBoxProps>();
  useEffect(() => {
    (async () => {
      console.log(loggedIn._id);
      const accountsResponse = await getAccounts({ userId: loggedIn._id });
      console.log(accountsResponse);
      setAccountsData(accountsResponse.data);
    })();
  }, []);
  if (!accountsData) return;
  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type="greeting"
            title="Welcome"
            subtext="Access and manage your account and transactions efficiently"
            user={loggedIn?.firstName || "Guest"}
          />
          <TotalBalanceBox
            accounts={accountsData?.accounts}
            totalBanks={accountsData?.totalBanks}
            totalCurrentBalance={accountsData?.totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        banks={[]}
        user={loggedIn}
        transactions={[]}
        accounts={accountsData?.accounts?.slice(0, 1)}
      />
    </section>
  );
};

export default Home;
