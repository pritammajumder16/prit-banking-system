import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  transactions = [],
  page = 1,
  bankId,
}: RecentTransactionsProps) => {
  const pageSize = 10;
  const totalPages = Math.ceil(transactions.length / pageSize);
  const indexOfLastTransaction = page * pageSize;
  const indexOfFirstTransaction = indexOfLastTransaction - pageSize;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <span className=" text-xl md:text-2xl font-semibold text-gray-900">
          Recent transactions
        </span>
        <Link
          href={`/transaction-history/?id=${bankId}`}
          className="text-sm rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          View all
        </Link>
      </header>
      <Tabs defaultValue={bankId}>
        <TabsList className="custom-scrollbar mb-8 flex w-full flex-nowrap">
          {accounts.map((account: Account) => (
            <TabsTrigger value={account.bank._id} key={account.id}>
              <BankTabItem account={account} bankId={account.bank._id} />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account: Account) => (
          <TabsContent
            key={account.id}
            value={account.bank._id}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              bankId={account?.bank._id}
              type={"full"}
            />
            <TransactionsTable transactions={currentTransactions} />
            {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination page={page} totalPages={totalPages} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
