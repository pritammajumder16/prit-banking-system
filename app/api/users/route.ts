import User from "@/Model/User";
import { errorResponse, successResponse } from "@/utils/apiUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const users = await User.find({});

    return successResponse({
      message: "Successfully fetched users",
      data: users,
    });
  } catch (error) {
    return errorResponse({ message: String(error) });
  }
}
