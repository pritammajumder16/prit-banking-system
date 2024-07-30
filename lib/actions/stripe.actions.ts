"use server";
import { credentials } from "@/constants/credentials";
import stripe from "stripe";
import {
  getErrorResponseObject,
  getSuccessResponseObject,
  parseStringify,
} from "../utils";
const getEnvironment = (): "production" | "sandbox" => {
  const environment = credentials.STRIPE_ENVIRONMENT as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

export const createStripeCustomer = async (data: {
  email: string;
  name: string;
}) => {
  try {
    const stripeClient = new stripe(credentials.STRIPE_SECRET_KEY!);
    const res = await stripeClient.customers.create(data);
    return getSuccessResponseObject({
      data: parseStringify(res),
      message: "Created stripe customer successfully",
    });
  } catch (error) {
    return getErrorResponseObject({ message: String(error) });
  }
};
