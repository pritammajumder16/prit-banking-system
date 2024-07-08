import { credentials } from "@/constants/credentials";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
const configuration = new Configuration({
  basePath: PlaidEnvironments[credentials.PLAID_ENV || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": credentials.PLAID_CLIENT_ID,
      "PLAID-SECRET": credentials.PLAID_SECRET_KEY,
      "Plaid-Version": "2020-09-14",
    },
  },
});
export const plaidClient = new PlaidApi(configuration);
