import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/auth";

const publicRoutes = ["/", "/sign-in", "/sign-up"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  // Fetch the session using betterFetch
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        // Get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // If user is authenticated
  if (session) {
    // Allow access to all routes for authenticated users
    return NextResponse.next();
  }

  // If user is not authenticated
  if (!session) {
    // Allow unauthenticated users to access only public routes
    if (publicRoutes.includes(pathName)) {
      return NextResponse.next();
    }

    // Redirect unauthenticated users to /sign-in for other routes
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
