// middleware.js
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {
  const token = await getToken({ req, secret })
  const { pathname } = req.nextUrl

  // ✅ All dashboard routes require login
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // ✅ Admin-only under /dashboard/admin/*
  if (pathname.startsWith("/dashboard/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
