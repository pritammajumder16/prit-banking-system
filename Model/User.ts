import mongoose, { Schema } from "mongoose";

const User = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: false },
    dwollaCustomerUrl: { type: String, required: false },
    dwollaCustomerId: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    password: { type: String, required: true },
    postalCode: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    ssn: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", User);
