import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Protect admin pages (except /admin login page itself)
  if (pathname.startsWith("/admin/")) {
    if (!token || token.role !== "admin") {
      const signInUrl = new URL("/admin", request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  // Protect dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token || token.role !== "member") {
      const signInUrl = new URL("/admin", request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  // Unauthenticated — redirect to sign in
  if (!token) {
    const signInUrl = new URL("/admin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/dashboard/:path*",
    "/admin/applications/:path*",
    "/admin/teams/:path*",
    "/admin/uploads/:path*",
    "/api/admin/:path*",
  ],
};
