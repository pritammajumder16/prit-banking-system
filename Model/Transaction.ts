import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema<any>(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true },
    channel: { type: String, required: true },
    category: { type: String, required: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    senderBankId: { type: String, required: true },
    receiverBankId: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.transaction ||
  mongoose.model("transaction", TransactionSchema);
