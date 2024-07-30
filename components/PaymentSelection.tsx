"use client";
import React from "react";
import { Button } from "./ui/button";
const PaymentSelection = ({
  onSelect,
}: {
  onSelect: React.Dispatch<React.SetStateAction<PaymentTypes | null>>;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-bold mb-4">Select Payment Method</h2>
      <Button onClick={() => onSelect("stripe")} className="form-btn">
        Stripe ACH
      </Button>
      <Button onClick={() => onSelect("dwolla")} className="form-btn">
        Dwolla ACH
      </Button>
    </div>
  );
};

export default PaymentSelection;
