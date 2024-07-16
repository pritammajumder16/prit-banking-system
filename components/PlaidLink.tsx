"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/plaid.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState(null);

  const router = useRouter();
  const getLinkToken = async () => {
    if (user) {
      const response = await createLinkToken(user);

      setToken(response?.data);
    }
  };

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      if (user) {
        await exchangePublicToken({ publicToken: public_token, user });
        router.push("/");
      }
    },
    [user]
  );
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    getLinkToken();
  }, [user]);
  return (
    <>
      {variant == "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant == "ghost" ? (
        <Button
          variant={"ghost"}
          onClick={() => open()}
          className="flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-7 hover:bg-white lg:justify-start"
        >
          <Image
            src={"/icons/connect-bank.svg"}
            alt={"connect bank"}
            width={24}
            height={24}
          />
          <p className=" hidden text-base font-semibold text-black-2 xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <Button
          onClick={() => open()}
          className="flex !justify-start cursor-pointer gap-3 rounded-lg !bg-transparent flex-row"
        >
          <Image
            src={"/icons/connect-bank.svg"}
            alt={"connect bank"}
            width={24}
            height={24}
          />
          <p className="text-base font-semibold text-black-2">Connect bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
