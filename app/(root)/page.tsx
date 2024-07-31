"use client";
import HeaderBox from "@/components/HeaderBox";
import Loading from "@/components/Loader";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { selectAuth } from "@/redux/selectors";
import { formUrlQuery } from "@/utils/functions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = ({ searchParams: { page, id } }) => {
  const loggedIn = useSelector(selectAuth);
  const searchParams = useSearchParams();
  const stableLoggedIn = useMemo(() => loggedIn, [loggedIn?._id]);
  const [accountsData, setAccountsData] = useState<TotlaBalanceBoxProps>();
  const [currentAccount, setCurrentAccount] = useState<{
    account: Account;
    transactions: Transaction[];
  }>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (stableLoggedIn) {
        const accountsResponse = await getAccounts({
          userId: stableLoggedIn?._id,
        });

        setAccountsData(accountsResponse.data);
        let currentBankId;
        if (id) {
          currentBankId = id;
        } else {
          currentBankId = accountsResponse?.data?.accounts?.[0]?.bank?._id;
        }

        const currentAccountResponse = await getAccount({
          bankId: currentBankId,
        });

        setCurrentAccount(currentAccountResponse.data);
      }
    })();
  }, [stableLoggedIn]);
  useEffect(() => {
    (async () => {
      if (
        id &&
        currentAccount?.account &&
        id != currentAccount?.account?.bank?._id
      ) {
        try {
          setLoading(true);
          const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "page",
            value: "1",
          });
          router.push(newUrl, { scroll: false });
          const currentAccountResponse = await getAccount({
            bankId: id,
          });

          setCurrentAccount(currentAccountResponse.data);
        } catch (error) {
          toast.error(error instanceof Error ? error.message : String(error));
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [id]);
  if (!accountsData || !currentAccount || !stableLoggedIn) return <Loading />;
  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen  overflow-hidden">
      <div className="no-scrollbar flex  flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12  overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type="greeting"
            title="Welcome"
            subtext="Access and manage your account and transactions efficiently"
            user={stableLoggedIn?.firstName || "Guest"}
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
          loading={loading}
          bankId={currentAccount.account.bank._id}
        />
      </div>
      <RightSidebar
        user={stableLoggedIn}
        transactions={currentAccount?.transactions}
        accounts={accountsData?.accounts?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
