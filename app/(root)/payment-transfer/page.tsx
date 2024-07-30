"use client";
import React, { useState } from "react";
import HeaderBox from "@/components/HeaderBox";
import PaymentSelection from "@/components/PaymentSelection";
import StripePaymentTransferForm from "@/components/StripePaymentTransferForm";
import PaymentTransferForm from "@/components/PaymentTransferForm";

const Transfer = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentTypes | null>(null);

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title={"Payment Transfer"}
        subtext={
          "Please provide any specific details or notes related to the payment transfer."
        }
      />

      <div className="size-full pt-5">
        {paymentMethod === null ? (
          <PaymentSelection onSelect={setPaymentMethod} />
        ) : paymentMethod === "stripe" ? (
          <StripePaymentTransferForm />
        ) : (
          <PaymentTransferForm />
        )}
      </div>
    </section>
  );
};

export default Transfer;
