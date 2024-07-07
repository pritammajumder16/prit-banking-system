import dbConnect from "./lib/connectDB";

export async function register() {
  await dbConnect();
}
