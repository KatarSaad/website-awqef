import { AuthService as ApiAuthService } from "@/api/generated/services/AuthService";
import { TokenResponseDto } from "@/api/generated/models/TokenResponseDto";
import { UserDto } from "@/api/generated/models/UserDto";
import Router from "next/router";

// Constants - match existing localStorage keys
const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_STORAGE_KEY = "auth_user";

// Types
export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

// Auth service implementation
const AuthService = {
  // Store tokens in localStorage and cookies
  setTokens: (tokens: AuthTokens): void => {
    if (typeof window !== "undefined") {
      // Store in localStorage
      localStorage.setItem(TOKEN_KEY, tokens.accessToken);
      if (tokens.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
      }

      // Also store in cookies for middleware
      document.cookie = `${TOKEN_KEY}=${tokens.accessToken}; path=/; max-age=${
        60 * 60
      }`; // 1 hour
      if (tokens.refreshToken) {
        document.cookie = `${REFRESH_TOKEN_KEY}=${
          tokens.refreshToken
        }; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
      }
    }
  },

  // Get access token from localStorage
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  // Get refresh token from localStorage
  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  },

  // Clear tokens from localStorage and cookies
  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      // Clear from localStorage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);

      // Clear from cookies
      document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `${REFRESH_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },

  // Store user in localStorage
  setUser: (user: UserDto): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  },

  // Get user from localStorage
  getUser: (): UserDto | null => {
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem(USER_STORAGE_KEY);
      if (userJson) {
        try {
          return JSON.parse(userJson);
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
    }
    return null;
  },

  // Clear user from localStorage
  clearUser: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },

  // Login user
  login: async (email: string, password: string): Promise<TokenResponseDto> => {
    try {
      const response = await ApiAuthService.authenticationControllerLogin({
        email,
        password,
      });

      // Store tokens in localStorage and cookies
      AuthService.setTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token || response.access_token, // Fallback if no refresh token
      });

      // Store user in localStorage
      AuthService.setUser(response.user);

      return response;
    } catch (error: any) {
      console.error("Login failed:", error);
      throw new Error(error?.message || "Login failed");
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      // Clear tokens from localStorage and cookies
      AuthService.clearTokens();

      // Clear user from localStorage
      AuthService.clearUser();

      // Redirect to login page
      Router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error("Logout failed");
    }
  },

  // Refresh token
  refreshToken: async (): Promise<boolean> => {
    try {
      const refreshToken = AuthService.getRefreshToken();

      if (!refreshToken) {
        return false;
      }

      const response =
        await ApiAuthService.authenticationControllerRefreshToken({
          refreshToken,
        });

      // Store new tokens in localStorage and cookies
      AuthService.setTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token || response.access_token,
      });

      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = AuthService.getToken();

      if (!token) {
        return false;
      }

      // Validate token with backend
      try {
        await ApiAuthService.authenticationControllerValidateToken({
          token,
        });
        return true;
      } catch (error) {
        // Try to refresh the token
        const success = await AuthService.refreshToken();
        return success;
      }
    } catch (error) {
      console.error("Auth validation error:", error);
      return false;
    }
  },

  // Get current user - simplified to just return the stored user
  getCurrentUser: async (): Promise<UserDto | null> => {
    // Just return the user from localStorage instead of making an API call
    return AuthService.getUser();
  },
};

export default AuthService;
