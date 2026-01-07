import User from "@/models/User";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ userId: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const { userId } = await params;
    const user = await User.findOne({ _id: userId });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json(
      { message: "User Is Not Found!" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Filed To Fetch User" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { userId } = await params;
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount) {
      return NextResponse.json(
        { message: "User Deleted Successfully :)" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Filed To Fetch User" },
      { status: 500 }
    );
  }
}
