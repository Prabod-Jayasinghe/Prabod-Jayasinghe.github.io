import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if target is admin panel routes
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const session = request.cookies.get("portfolio_admin_session")?.value;
    const isAuthed = session === "1";

    if (pathname === "/admin/login") {
      // If already logged in, redirect away from login to dashboard
      if (isAuthed) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      // If not logged in, redirect to login page
      if (!isAuthed) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
