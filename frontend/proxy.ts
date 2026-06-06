import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    // logout case
    if(!token && request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url))
    } 
    // login case
    else if((token && request.nextUrl.pathname === "/login") || (token && request.nextUrl.pathname === "/sign-up")){
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/sign-up"]
}