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

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user._id,
      },
      client_name: user.lastName,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const response = await plaidClient.linkTokenCreate(tokenParams);
    return getSuccessResponseObject({
      message: "successfully fetched token",
      data: parseStringify(response),
    });
  } catch (error) {
    return getErrorResponseObject({ message: String(error) });
  }
};
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };
    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data.processor_token;

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    if (fundingSourceUrl) {
      await createBankAccount({
        userId: user._id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        shareableId: encryptId(accountData.account_id),
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
