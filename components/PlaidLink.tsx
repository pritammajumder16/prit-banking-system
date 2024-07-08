"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken } from "@/lib/actions/plaid.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState();
  const router = useRouter();
  useEffect(() => {
    const getLinkToken = async () => {
      const response = await createLinkToken(user);
      setToken(response?.data?.linkToken);
    };
    getLinkToken();
  }, []);
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      // await exchangePublicToken({publicToken:public_token,user})
      router.push("/");
    },
    [user]
  );
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
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
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
