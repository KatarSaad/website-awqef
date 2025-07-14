import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Clear auth token cookie
    response.cookies.set({
      name: "awqef_auth_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    // Clear refresh token cookie
    response.cookies.set({
      name: "awqef_refresh_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error("Error clearing cookies:", error);
    return NextResponse.json(
      { error: "Failed to clear authentication cookies" },
      { status: 500 }
    );
  }
}