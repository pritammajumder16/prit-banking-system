import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import CategoryBadge from "./CategoryBadge";

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  console.log(transactions);
  return (
    <Table>
      <TableCaption className="bg-[#f9fafb]">
        A list of your recent invoices.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>

          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);
          console.log(amount);
          const isDebit = t.type === "debit";

          const isCredit = t.type === "credit";
          return (
            <TableRow
              key={t.id}
              className={`${
                isDebit || amount[0] == "-" ? "bg-[#fffbfa]" : "bg-[#f6fef9]"
              } hover:!bg-white !border-b-DEFAULT`}
            >
              <TableCell className="font-medium max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <span className="text-sm truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </span>
                </div>
              </TableCell>
              <TableCell
                className={`pl-2 pr-10 font-semibold text-nowrap ${
                  isDebit || amount[0] == "-"
                    ? "text-[#f04438]"
                    : "text-[#039855]"
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>
              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className="pl-2 pr-10 min-w-32">
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize">
                {t.paymentChannel}
              </TableCell>
              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadge category={t.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
