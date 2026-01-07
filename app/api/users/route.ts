import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { signUpInfo, signUpSchema } from "@/schemas/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed To Fetch Users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body: signUpInfo = await request.json();
    const validationResult = signUpSchema.safeParse(body);
    if (validationResult.success) {
      const { userName, email, password } = body;
      const user = await User.create({
        userName,
        email,
        password,
      });
      return NextResponse.json(user, { status: 201 });
    }
    return NextResponse.json(
      { message: "Data Is Not Valid!" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed To Fetch User" },
      { status: 500 }
    );
  }
}
