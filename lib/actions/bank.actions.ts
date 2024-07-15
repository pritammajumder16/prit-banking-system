"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import {
  getErrorResponseObject,
  getSuccessResponseObject,
  parseStringify,
} from "../utils";

import Bank from "@/Model/Bank";
import { plaidClient } from "../plaid";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // get banks from db
    const banks = await Bank.find({ userId });
    const accounts = await Promise.all(
      banks?.map(async (bank: Bank & { _id: string }) => {
        // get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        const transactions = (
          await getTransactions({
            accessToken: bank?.accessToken,
          })
        ).data;

        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution?.data?.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          bankId: bank._id,
          transactions: transactions,
          sharableId: bank.sharableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
    return getSuccessResponseObject({
      message: "successfully fetched accounts",
      data: parseStringify({
        accounts,
        totalBanks,
        totalCurrentBalance,
        banks,
      }),
    });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);

    return getErrorResponseObject({ message: String(error) });
  }
};

// Get one bank account
export const getAccount = async ({ bankId }: getAccountProps) => {
  try {
    // get bank from db
    const bank = await Bank.findOne({ bankId });

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // // get transfer transactions from appwrite
    // const transferTransactionsData = await getTransactionsByBankId({
    //   bankId: bank._id,
    // });

    // const transferTransactions = transferTransactionsData.documents.map(
    //   (transferData: Transaction) => ({
    //     id: transferData._id,
    //     name: transferData.name!,
    //     amount: transferData.amount!,
    //     date: transferData.createdAt,
    //     paymentChannel: transferData.channel,
    //     category: transferData.category,
    //     type: transferData.senderBankId === bank.$id ? "debit" : "credit",
    //   })
    // );

    // get institution info from plaid
    const institution = (
      await getInstitution({
        institutionId: accountsResponse.data.item.institution_id!,
      })
    )?.data;

    const transactions = (
      await getTransactions({
        accessToken: bank?.accessToken,
      })
    )?.data;

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };

    // sort transactions by date such that the most recent transaction is first
    const allTransactions = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return getSuccessResponseObject({
      message: "successfully fetched account",
      data: parseStringify({
        data: account,
        transactions: allTransactions,
      }),
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);

    return getErrorResponseObject({ message: String(error) });
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return getSuccessResponseObject({
      message: "successfully institution",
      data: parseStringify(intitution),
    });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }
    return getSuccessResponseObject({
      message: "successfully fetched transactions",
      data: parseStringify(transactions),
    });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);

    return getErrorResponseObject({ message: String(error) });
  }
};

// Create Transfer
export const createTransfer = async () => {
  const transferAuthRequest: TransferAuthorizationCreateRequest = {
    access_token: "access-sandbox-cddd20c1-5ba8-4193-89f9-3a0b91034c25",
    account_id: "Zl8GWV1jqdTgjoKnxQn1HBxxVBanm5FxZpnQk",
    funding_account_id: "442d857f-fe69-4de2-a550-0c19dc4af467",
    type: "credit" as TransferType,
    network: "ach" as TransferNetwork,
    amount: "10.00",
    ach_class: "ppd" as ACHClass,
    user: {
      legal_name: "Anne Charleston",
    },
  };
  try {
    const transferAuthResponse = await plaidClient.transferAuthorizationCreate(
      transferAuthRequest
    );
    const authorizationId = transferAuthResponse.data.authorization.id;

    const transferCreateRequest: TransferCreateRequest = {
      access_token: "access-sandbox-cddd20c1-5ba8-4193-89f9-3a0b91034c25",
      account_id: "Zl8GWV1jqdTgjoKnxQn1HBxxVBanm5FxZpnQk",
      description: "payment",
      authorization_id: authorizationId,
    };

    const responseCreateResponse = await plaidClient.transferCreate(
      transferCreateRequest
    );

    const transfer = responseCreateResponse.data.transfer;
    return getSuccessResponseObject({
      message: "successfully fetched transfer",
      data: parseStringify(transfer),
    });
  } catch (error) {
    console.error(
      "An error occurred while creating transfer authorization:",
      error
    );

    return getErrorResponseObject({ message: String(error) });
  }
};
