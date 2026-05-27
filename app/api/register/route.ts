import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// import { connectToDatabase } from "@/lib/mongodb";
// import jwt from "jsonwebtoken";
// import { hash } from "bcryptjs";
// import User from "@/models/User";
import { signUpSchema } from "@/schemas/auth";
import { SignUpInfo } from "@/lib/types";
//

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  try {
    // <============= fake auth proses =============> //
      const body: SignUpInfo = await request.json();
      const validationResult = signUpSchema.safeParse(body);

      if(validationResult.success){
        cookieStore.set("token", Math.random().toString(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        return NextResponse.json( "", { status: 201 });
      }
      return NextResponse.json(
        { message: "Data Is Not Valid!" },
        { status: 400 }
      );
    // <============= real auth proses =============> //
    // await connectToDatabase();
    // const body: SignUpInfo = await request.json();
    // const validationResult = signUpSchema.safeParse(body);
    // // client infos validation
    // if (validationResult.success) {
    //   const { userName, email, password } = body;
    //   // user exist validation
    //   const existingUser = await User.findOne({ email });
    //   if (existingUser) {
    //     return NextResponse.json(
    //       { message: "User Already Exists!" },
    //       { status: 409 }
    //     );
    //   }
    //   // password hashing
    //   const hashedPassword = await hash(password, 10);
    //   const user: DBSignUpInfos = await User.create({
    //     userName,
    //     email,
    //     password: hashedPassword
    //   });
    //   // create and set token
    //   const userId = user._id?.toString() || String(user._id);
    //   console.log(`con user => ${userId}`);
    //   // problem is into this code 👇
    //   const token = jwt.sign(
    //     { userId },
    //     process.env.JWT_SECRET!,
    //     { expiresIn: "7d" }
    //   );
    //   // problem is into this code ☝
    //   console.log(`con user => ${token}`);
    //   cookieStore.set("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 7,
    //   });
    //   // console.log(token);
    //   return NextResponse.json(user, { status: 201 });
    // }
    // return NextResponse.json(
    //   { message: "Data Is Not Valid!" },
    //   { status: 400 }
    // );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed To Connect To The DataBase!" },
      { status: 500 }
    );
  }
}
