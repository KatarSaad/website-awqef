import { NextRequest, NextResponse } from "next/server";
import { AuthService as ApiAuthService } from "@/api/generated/services/AuthService";

export async function GET(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get("awqef_auth_token")?.value;
    
    if (!token) {
      // Return a 200 response with valid: false instead of 401
      // This prevents console errors for unauthenticated users
      return NextResponse.json(
        { valid: false, authenticated: false },
        { status: 200 }
      );
    }

    // Validate token with backend
    try {
      await ApiAuthService.authenticationControllerValidateToken({
        token
      });
      
      // Token is valid
      return NextResponse.json({ valid: true, authenticated: true }, { status: 200 });
    } catch (error) {
      // Try to refresh the token
      const refreshToken = req.cookies.get("awqef_refresh_token")?.value;
      
      if (!refreshToken) {
        return NextResponse.json(
          { valid: false, authenticated: false },
          { status: 200 }
        );
      }
      
      try {
        const refreshResponse = await ApiAuthService.authenticationControllerRefreshToken({
          refreshToken
        });
        
        const response = NextResponse.json(
          { valid: true, refreshed: true, authenticated: true },
          { status: 200 }
        );
        
        // Set new tokens in cookies
        response.cookies.set({
          name: "awqef_auth_token",
          value: refreshResponse.access_token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60, // 1 hour
        });
        
        if (refreshResponse.refresh_token) {
          response.cookies.set({
            name: "awqef_refresh_token",
            value: refreshResponse.refresh_token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
          });
        }
        
        return response;
      } catch (refreshError) {
        return NextResponse.json(
          { valid: false, authenticated: false },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json(
      { valid: false, authenticated: false },
      { status: 200 }
    );
  }
}