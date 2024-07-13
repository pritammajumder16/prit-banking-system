import mongoose, { Schema } from "mongoose";

const BankAccountSchema = new Schema<bankAccount>(
  {
    accessToken: { type: String, required: true },
    userId: { type: String, required: true },
    accountId: { type: String, required: true },
    bankId: { type: String, required: true },
    fundingSourceUrl: { type: String, required: true },
    sharableId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.bankAccount ||
  mongoose.model("bankAccount", BankAccountSchema);
