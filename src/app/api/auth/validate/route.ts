import { NextRequest, NextResponse } from "next/server";

// This is a static version of the route that doesn't use cookies
// It will be used during build time and then replaced with the dynamic version at runtime
export async function GET(req: NextRequest) {
  return NextResponse.json(
    { valid: false, authenticated: false, message: "Static build version" },
    { status: 200 }
  );
}

// Mark this route as static for build time
export const dynamic = 'force-static';

// This comment explains what's happening:
// During build time, this static version will be used
// At runtime, the actual implementation will handle authentication