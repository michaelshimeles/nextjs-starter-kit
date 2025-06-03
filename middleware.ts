import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // /api/payments/webhooks is a webhook endpoint that should be accessible without authentication
  if (pathname.startsWith("/api/payments/webhooks")) {
    return NextResponse.next();
  }

  // Handle invitation routes
  if (pathname.startsWith("/accept-invitation/")) {
    if (!sessionCookie) {
      // Redirect to sign-in with the invitation URL as return parameter
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(signInUrl);
    }
    // User is authenticated, allow them to proceed to invitation page
    return NextResponse.next();
  }

  if (sessionCookie && ["/sign-in", "/sign-up"].includes(pathname)) {
    // Check if there's a returnTo parameter
    const returnTo = request.nextUrl.searchParams.get("returnTo");
    if (returnTo && returnTo.startsWith("/accept-invitation/")) {
      return NextResponse.redirect(new URL(returnTo, request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/accept-invitation/:path*",
  ],
};
