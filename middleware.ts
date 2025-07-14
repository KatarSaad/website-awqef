import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/api",
  "/public",
  "/v1/api/auth/validate", // Exclude validation endpoint
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/robots.txt",
];

const TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  console.log(`[Middleware] Path: ${pathname}`);

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    console.log(`[Skipping] Public path: ${pathname}`);
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get(TOKEN_KEY)?.value;
  console.log(`[Token] ${token ? "Exists" : "Missing"}`);

  if (!token) {
    console.log("[Redirect] No token → /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Validate token
    const validateRes = await fetch(`${origin}/v1/api/auth/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!validateRes.ok) throw new Error("Invalid token");

    console.log("[Validation] Token valid");
    return NextResponse.next();
  } catch (error) {
    console.log(`[Redirect] Invalid token → /login`, error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|public|.*\\.).*)"],
};
