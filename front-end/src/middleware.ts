import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";

export  async function middleware (req: NextRequest) {
  const token = await getToken({req: req});

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

}

export const config = {matcher: ["/cart", "/checkout/:id*"]}