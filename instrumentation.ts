import dbConnect from "./lib/connectDB";

import * as Sentry from "@sentry/nextjs";
export async function register() {
  await dbConnect();
  Sentry.init({
    dsn: "https://cedb0f28d201239cfb1eb7651e3f202d@o4507561757376512.ingest.de.sentry.io/4507561761767504",
    tracesSampleRate: 1,
    debug: false,
  });
}
