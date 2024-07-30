"use server";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../plaid";
import {
  encryptId,
  getErrorResponseObject,
  getSuccessResponseObject,
  parseStringify,
} from "../utils";
import { revalidatePath } from "next/cache";
import { addFundingSource } from "./dwolla.actions";
import Bank from "@/Model/Bank";

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user._id,
      },
      client_name: user.lastName,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: [
        "US",
        "GB",
        "ES",
        "NL",
        "FR",
        "IE",
        "CA",
        "DE",
        "IT",
        "PL",
        "DK",
        "NO",
        "SE",
        "EE",
        "LT",
        "LV",
        "PT",
        "BE",
      ] as CountryCode[],
    };
    const response = await plaidClient.linkTokenCreate(tokenParams);
    return getSuccessResponseObject({
      message: "successfully fetched token",
      data: response.data.link_token,
    });
  } catch (error) {
    return getErrorResponseObject({ message: String(error) });
  }
};
export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: bankAccount) => {
  try {
    await Bank.create({
      userId,
      bankId,
      accountId,
      accessToken,
      fundingSourceUrl,
      sharableId,
    });
  } catch (error) {}
};
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    console.log("Called");
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];
    const request = {
      access_token: accessToken,
      account_id: accountData.account_id,
    };
    const stripeProcessor =
      await plaidClient.processorStripeBankAccountTokenCreate(request);
    console.log("stripeProcessor", stripeProcessor);
    const processorTokenResponse = await plaidClient.processorTokenCreate({
      ...request,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    });
    console.log("dwollaProcessor", processorTokenResponse);
    const processorToken = processorTokenResponse.data.processor_token;

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    if (fundingSourceUrl) {
      const fundingSource = await createBankAccount({
        userId: user._id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        sharableId: encryptId(accountData.account_id),
      });
    }
    revalidatePath("/");

    return getSuccessResponseObject({
      message: "successfully fetched token",
      data: parseStringify({ publicTokenExchange: "complete" }),
    });
  } catch (error) {
    return getErrorResponseObject({ message: String(error) });
  }
};
