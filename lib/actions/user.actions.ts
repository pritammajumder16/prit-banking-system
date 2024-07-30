"use server";
import User from "@/Model/User";
import jwt from "jsonwebtoken";
import {
  extractCustomerIdFromUrl,
  getErrorResponseObject,
  getSuccessResponseObject,
  hash,
  parseStringify,
  verifyHash,
} from "../utils";
import { cookies } from "next/headers";
import { credentials } from "@/constants/credentials";
import { createDwollaCustomer } from "./dwolla.actions";
import { HttpException } from "@/classes/http-exception";
import { createStripeCustomer } from "./stripe.actions";

export const signIn = async (data: signInProps) => {
  try {
    if (!data.email || !data.password) {
      throw new HttpException("email and password are required", 400);
    }
    let userDetails: any = await User.findOne({ email: data.email }).lean();
    if (!userDetails) {
      return getErrorResponseObject({
        message: "Could not find user with the email",
      });
    }
    if (!(await verifyHash(data.password, userDetails.password))) {
      return getErrorResponseObject({ message: "Invalid password" });
    }
    delete userDetails.password;
    if (!credentials.JWT_ACCESS_SECRET || !credentials.JWT_REFRESH_SECRET) {
      return getErrorResponseObject({
        message: "Internal server error",
      });
    }
    cookies().set(
      "access-token",
      jwt.sign(userDetails, credentials.JWT_ACCESS_SECRET, { expiresIn: "24h" })
    );
    cookies().set(
      "refresh-token",
      jwt.sign(userDetails, credentials.JWT_REFRESH_SECRET, {
        expiresIn: "10d",
      })
    );
    return getSuccessResponseObject({
      data: userDetails,
      message: "Logged in successfully",
    });
  } catch (error) {
    return getErrorResponseObject({ message: String(error) });
  }
};

export const signUp = async (data: SignUpParams) => {
  try {
    const finalData: any = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      dateOfBirth: data.dateOfBirth,
      ssn: data.ssn,
    };

    finalData.password = await hash(data.password);
    const stripeCustomer = await createStripeCustomer({
      email: finalData.email,
      name: `${finalData.firstName} ${finalData.lastName}`,
    });
    if (!stripeCustomer || !stripeCustomer.success) {
      throw new HttpException("Error creating stripe customer id", 400);
    }
    console.log("Stripe customer", stripeCustomer);
    finalData.stripeCustomerId = stripeCustomer.data.id;
    const dwollaCustomerUrl = await createDwollaCustomer({
      ...finalData,
      address1: finalData.address,
      type: "personal",
    });
    if (!dwollaCustomerUrl) {
      throw new HttpException("Error creating dwolla customer id", 400);
    }
    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    finalData.dwollaCustomerId = dwollaCustomerId;
    finalData.dwollaCustomerUrl = dwollaCustomerUrl;
    const res = await User.create(finalData);
    return getSuccessResponseObject({
      data: parseStringify(res),
      message: "Signed up successfully",
    });
  } catch (error) {
    return getErrorResponseObject({ message: String(error) });
  }
};

export const getDetailsFromToken = async () => {
  try {
    const accessToken = cookies().get("access-token");
    if (!accessToken) {
      return getErrorResponseObject({ message: "Unauthorized" });
    }
    if (!credentials.JWT_ACCESS_SECRET) {
      return getErrorResponseObject({
        message: "Internal server error",
      });
    }
    const decoded = jwt.verify(
      accessToken.value,
      credentials.JWT_ACCESS_SECRET
    );
    if (!decoded) {
      return getErrorResponseObject({
        message: "Token expired, please login again!",
        data: "TOKEN_EXPIRED",
      });
    }
    return getSuccessResponseObject({
      message: "Obtained details successfully",
      data: decoded,
    });
  } catch (error) {
    return getErrorResponseObject({
      message: String(error),
    });
  }
};

export const verifyWithRefreshToken = async () => {
  try {
    const refreshToken = cookies().get("refresh-token");
    if (!refreshToken) {
      return getErrorResponseObject({
        message: "Token expired, please login again!",
        data: "TOKEN_EXPIRED",
      });
    }
    if (!credentials.JWT_REFRESH_SECRET || !credentials.JWT_ACCESS_SECRET) {
      return getErrorResponseObject({
        message: "Internal server error",
      });
    }
    const decoded = jwt.verify(
      refreshToken.value,
      credentials.JWT_REFRESH_SECRET
    );
    if (!decoded) {
      return getErrorResponseObject({
        message: "Token expired, please login again!",
        data: "TOKEN_EXPIRED",
      });
    }
    cookies().set(
      "access-token",
      jwt.sign(decoded, credentials.JWT_ACCESS_SECRET, { expiresIn: "24h" })
    );
    cookies().set(
      "refresh-token",
      jwt.sign(decoded, credentials.JWT_REFRESH_SECRET, {
        expiresIn: "10d",
      })
    );
    return getSuccessResponseObject({
      message: "Successfully fetched details",
      data: decoded,
    });
  } catch (error) {
    return getErrorResponseObject({
      message: String(error),
    });
  }
};
export const logout = () => {
  try {
    cookies().delete("access-token");
    cookies().delete("refresh-token");
    return getSuccessResponseObject({
      message: "Successfully logged out ",
      data: { success: true },
    });
  } catch (error) {
    return getErrorResponseObject({
      message: String(error),
    });
  }
};
