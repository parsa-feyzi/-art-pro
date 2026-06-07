// import { connectToDatabase } from "@/src/lib/mongodb";
// import User from "@/models/User";
import users from '@/src/lib/mockApi/usersData.json'
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // await connectToDatabase();
    // const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed To Fetch Users" },
      { status: 500 }
    );
  }
}
