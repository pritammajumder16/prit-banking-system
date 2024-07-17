"use client";
import HeaderBox from "@/components/HeaderBox";
import Loading from "@/components/Loader";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccounts, getAccount } from "@/lib/actions/bank.actions";
import { formatAmount } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TransactionHistory = () => {
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

      setAccountsData(accountsResponse.data);
      const currentBankId = accountsResponse?.data?.accounts?.[0]?.bank?._id;

      const currentAccountResponse = await getAccount({
        bankId: currentBankId,
      });

      setCurrentAccount(currentAccountResponse.data);
    })();
  }, []);
  if (!currentAccount) return <Loading />;
  return (
    <section className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title={"Transaction History"}
          subtext={"See your bank details and transactions."}
        />
      </div>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-lg border-y bg-blue-600 px-4 py-5 md:flex-row">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-white">
              {currentAccount?.account.name}
            </span>
            <span className="text-sm text-blue-25">
              {currentAccount?.account.officialName}
            </span>{" "}
            <span className=" text-sm whitespace-nowrap font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●●{" "}
              <span className="text-base">{currentAccount?.account.mask}</span>
            </span>
          </div>
          <div className="flex-center flex-col  gap-2 rounded-md bg-blue-25/20 px-4 py-2 text-white">
            <p className="text-sm">Current balance</p>
            <p className=" text-2xl text-center font-bold">
              {formatAmount(currentAccount?.account.currentBalance || 0)}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6">
          <TransactionsTable
            transactions={currentAccount?.transactions || []}
          />
        </div>
      </div>
    </section>
  );
};

export default TransactionHistory;
