import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // Protect /admin and /customer routes
  if ((pathname.startsWith("/admin") || pathname.startsWith("/customer")) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin-only access for /admin/*
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};
