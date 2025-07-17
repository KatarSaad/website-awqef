"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuthStore, UserRole } from "@/hooks/useAuth";
import { UserDto } from "@/api/generated/models/UserDto";
import { useRouter, usePathname } from "next/navigation";
import AuthService from "@/lib/auth";
import { AuthService as ApiAuthService } from "@/api/generated/services/AuthService";

interface AuthContextType {
  user: UserDto | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  // Auth methods
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;

  // User methods
  updateProfile: (userData: Partial<UserDto>) => Promise<UserDto>;

  // Session methods
  checkAuth: () => Promise<boolean>;
  refreshSession: () => Promise<boolean>;

  // Role methods
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthStore();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [initialized, setInitialized] = useState(false); // Local initialized state
  const initialCheckDone = useRef(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Derived state
  const isAuthenticated = !!auth.user;
  const isAdmin = auth.hasRole("admin");
  const isModerator = auth.hasRole(["admin", "moderator"]);

  // Define public paths that don't need authentication
  const isPublicPath = (path: string | null) => {
    if (!path) return false;
    return ["/login", "/register", "/forgot-password", "/reset-password"].some(
      (publicPath) => path.startsWith(publicPath)
    );
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!initialCheckDone.current) {
        setIsAuthChecking(true);
        try {
          // Get token from localStorage
          const token = AuthService.getToken();
          if (token) {
            try {
              // Update OpenAPI token configuration
              if (typeof window !== "undefined" && window.OpenAPI) {
                window.OpenAPI.TOKEN = token;
              }
              
              // Directly call the API to validate the token
              await ApiAuthService.authenticationControllerValidateToken({
                token,
              });
              // If validation succeeds, get the current user from localStorage
              const user = AuthService.getUser();
              if (user) {
                // Update the auth store with the user
                await auth.checkAuth();
              } else {
                // If no user but token is valid, redirect to login
                if (!isPublicPath(pathname)) {
                  router.replace("/login");
                }
              }
            } catch (error) {
              console.error("Token validation failed:", error);
              // Try to refresh the token
              const refreshSuccess = await AuthService.refreshToken();
              if (!refreshSuccess) {
                // Clear auth state if refresh fails
                AuthService.clearTokens();
                AuthService.clearUser();
                // Redirect to login for protected routes
                if (!isPublicPath(pathname)) {
                  router.replace("/login");
                }
              } else {
                // If refresh succeeds, re-check auth
                await auth.checkAuth();
              }
            }
          } else if (!isPublicPath(pathname)) {
            // No token and not on a public path, redirect to login
            router.replace("/login");
          }
        } finally {
          initialCheckDone.current = true;
          setIsAuthChecking(false);
          setInitialized(true); // Set initialized only after all checks
        }
      }
    };
    checkAuth();
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [auth, pathname, router]);

  // Set up refresh interval only when authenticated and after initial check
  useEffect(() => {
    if (isAuthenticated && initialCheckDone.current) {
      // Clear any existing interval
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }

      // Set new interval
      refreshIntervalRef.current = setInterval(async () => {
        try {
          const success = await auth.refreshSession();
          if (!success) {
            // If refresh fails, redirect to login
            if (!isPublicPath(pathname)) {
              router.push("/login");
            }
          }
        } catch (error) {
          console.error("Session refresh failed:", error);
          // If refresh throws an error, redirect to login
          if (!isPublicPath(pathname)) {
            router.push("/login");
          }
        }
      }, 15 * 60 * 1000); // Refresh every 15 minutes

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
          refreshIntervalRef.current = null;
        }
      };
    }
  }, [isAuthenticated, auth, pathname, router]);

  // Handle unauthorized API responses
  useEffect(() => {
    const handleUnauthorized = () => {
      // Clear auth state
      AuthService.clearTokens();
      AuthService.clearUser();

      // Redirect to login if not on a public path
      if (!isPublicPath(pathname)) {
        router.push("/login");
      }
    };

    // Listen for 401 errors
    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, [pathname, router]);

  const contextValue: AuthContextType = {
    ...auth,
    isAuthenticated,
    isAdmin,
    isModerator,
    initialized, // Use local initialized state
  };

  // Show loading state during initial auth check
  if (isAuthChecking || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};

// HOC for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    roles?: UserRole | UserRole[];
    redirectTo?: string;
  }
) {
  return function ProtectedRoute(props: P) {
    const auth = useAuthContext();
    const router = useRouter();
    const redirectAttempted = useRef(false);

    useEffect(() => {
      if (auth.initialized && !auth.loading && !redirectAttempted.current) {
        // Not authenticated
        if (!auth.isAuthenticated) {
          redirectAttempted.current = true;
          router.push(options?.redirectTo || "/login");
          return;
        }

        // Role check
        if (options?.roles && !auth.hasRole(options.roles)) {
          redirectAttempted.current = true;
          router.push("/unauthorized");
          return;
        }
      }
    }, [auth.initialized, auth.loading, auth.isAuthenticated, router, options]);

    // Show loading state
    if (auth.loading || !auth.initialized) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    // Not authenticated or doesn't have required role
    if (
      !auth.isAuthenticated ||
      (options?.roles && !auth.hasRole(options.roles))
    ) {
      return null;
    }

    // Render the protected component
    return <Component {...props} />;
  };
}
