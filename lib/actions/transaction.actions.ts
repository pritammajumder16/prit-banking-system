"use server";

import Transaction from "@/Model/Transaction";
import {
  getErrorResponseObject,
  getSuccessResponseObject,
  parseStringify,
} from "../../utils/functions";

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  const transactionResponse = await Transaction.create({
    channel: "online",
    category: "Transfer",
    ...transaction,
  });
  try {
    return getSuccessResponseObject({
      message: "successfully created transaction",
      data: parseStringify(transactionResponse),
    });
  } catch (error) {
    return getErrorResponseObject({
      message: String(error),
    });
  }
};
export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  console.log(bankId);
  const senderTransactions = await Transaction.find({
    senderBankId: String(bankId),
  });
  const receiverTransactions = await Transaction.find({
    receiverBankId: String(bankId),
  });
  try {
    return getSuccessResponseObject({
      message: "successfully created transaction",
      data: parseStringify({
        transactions: [...senderTransactions, ...receiverTransactions],
      }),
    });
  } catch (error) {
    return getErrorResponseObject({
      message: String(error),
    });
  }
};
