"use client";
import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const loggedIn = useSelector((state: any) => {
    return state?.auth?.auth;
  });
  const [page, setPage] = useState<number>(1);
  const [accountsData, setAccountsData] = useState<TotlaBalanceBoxProps>();
  const [currentAccount, setCurrentAccount] = useState<{
    account: Account;
    transactions: Transaction[];
  }>();
  useEffect(() => {
    (async () => {
      const accountsResponse = await getAccounts({ userId: loggedIn._id });
      console.log(accountsResponse);
      setAccountsData(accountsResponse.data);
      const currentBankId = accountsResponse?.data?.accounts?.[0]?.bank?._id;
      console.log(currentBankId);
      const currentAccountResponse = await getAccount({
        bankId: currentBankId,
      });

      setCurrentAccount(currentAccountResponse.data);
    })();
  }, []);
  if (!accountsData || !currentAccount)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
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
        <RecentTransactions
          accounts={accountsData.accounts}
          transactions={currentAccount.transactions}
          page={page}
          bankId={currentAccount.account.bank._id}
        />
      </div>
      <RightSidebar
        banks={[]}
        user={loggedIn}
        transactions={currentAccount?.transactions}
        accounts={accountsData?.accounts?.slice(0, 1)}
      />
    </section>
  );
};

export default Home;
