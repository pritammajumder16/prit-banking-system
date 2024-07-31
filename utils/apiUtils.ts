import { NextResponse } from "next/server";

export const errorResponse = ({
  message,
  data,
}: {
  message: string;
  data?: any;
}) => {
  return NextResponse.json({ success: false, message, data });
};
export const successResponse = ({
  message,
  data,
}: {
  message: string;
  data: any;
}) => {
  return NextResponse.json({ success: false, message, data });
};
