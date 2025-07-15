import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't need authentication
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/api/auth",
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/robots.txt",
];

// Token key in localStorage/cookies
const TOKEN_KEY = "auth_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    const response = NextResponse.next();
    // Add Referrer-Policy header
    response.headers.set('Referrer-Policy', 'no-referrer');
    return response;
  }

  // Check for token in cookies
  const token = request.cookies.get(TOKEN_KEY)?.value;
  
  // If no token or token is empty, redirect to login
  if (!token || token.trim() === "") {
    // No token found, redirect to login
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    const response = NextResponse.redirect(url);
    // Add Referrer-Policy header
    response.headers.set('Referrer-Policy', 'no-referrer');
    return response;
  }
  
  // Token exists, allow the request but let client-side handle validation
  const response = NextResponse.next();
  // Add Referrer-Policy header
  response.headers.set('Referrer-Policy', 'no-referrer');
  return response;
}

// Match all routes except static assets and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};