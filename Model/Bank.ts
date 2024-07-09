import mongoose, { Schema } from "mongoose";

const BankAccountSchema = new Schema<bankAccount>(
  {
    accessToken: { Type: String, required: true },
    userId: { Type: String, required: true },
    accountId: { Type: String, required: true },
    bankId: { Type: String, required: true },
    fundingSourceUrl: { Type: String, required: true },
    sharableId: { Type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.bankAccount ||
  mongoose.model("bankAccount", BankAccountSchema);
