"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
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
import Loading from "./Loader";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const getLinkToken = useCallback(async () => {
    if (user) {
      const response = await createLinkToken(user);
      console.log(response);
      setToken(response?.data);
      setLoading(false);
    }
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      console.log(public_token);
      if (user) {
        await exchangePublicToken({ publicToken: public_token, user });
        router.push("/");
      }
    },
    [user, router]
  );

  useEffect(() => {
    getLinkToken();
  }, [getLinkToken]);

  const config: PlaidLinkOptions = useMemo(
    () => ({
      token,
      onSuccess,
    }),
    [token, onSuccess]
  );

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
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
          <p className="text-base font-semibold text-black-2 xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <Button
          onClick={() => open()}
          className="flex justify-start cursor-pointer gap-3 rounded-lg bg-transparent flex-row"
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
