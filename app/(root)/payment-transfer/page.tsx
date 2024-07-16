import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import React from "react";

const Transfer = () => {
  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title={"Payment Transfer"}
        subtext={
          "Please provide any specific details or notes related to the payment transfer."
        }
      />
      <div className="size-full pt-5">
        <PaymentTransferForm />
      </div>
    </section>
  );
};

export default Transfer;
