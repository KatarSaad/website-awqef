import { create } from "zustand";
import { UserDto } from "@/api/generated/models/UserDto";
import { TokenResponseDto } from "@/api/generated/models/TokenResponseDto";
import AuthService from "@/lib/auth";
import { AuthService as ApiAuthService } from "@/api/generated/services/AuthService";

// Define user roles
export type UserRole = "admin" | "moderator" | "user" | "guest";

// Auth state interface
interface AuthState {
  user: UserDto | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  lastAuthCheck: number;
  
  // Auth methods
  login: (email: string, password: string) => Promise<TokenResponseDto>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<TokenResponseDto>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  
  // User methods
  updateProfile: (userData: Partial<UserDto>) => Promise<UserDto>;
  
  // Session methods
  checkAuth: () => Promise<boolean>;
  refreshSession: () => Promise<boolean>;
  
  // Role methods
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  isAdmin: () => boolean;
  isModerator: () => boolean;
}

// Minimum time between auth checks (5 seconds)
const MIN_AUTH_CHECK_INTERVAL = 5000;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: AuthService.getUser(),
  loading: false,
  error: null,
  initialized: false,
  lastAuthCheck: 0,
  
  // Auth methods
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.login(email, password);
      // Update state immediately to avoid blank page
      set({ 
        user: response.user, 
        loading: false,
        initialized: true,
        lastAuthCheck: Date.now()
      });
      return response;
    } catch (error: any) {
      set({ 
        error: error?.message || "Login failed", 
        loading: false,
        initialized: true
      });
      throw error;
    }
  },
  
  logout: async () => {
    set({ loading: true });
    try {
      await AuthService.logout();
      set({ 
        user: null, 
        loading: false,
        initialized: true,
        lastAuthCheck: Date.now()
      });
    } catch (error: any) {
      set({ 
        error: error?.message || "Logout failed", 
        loading: false,
        initialized: true
      });
      throw error;
    }
  },
  
  register: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const response = await ApiAuthService.authenticationControllerRegister({
        email,
        password,
        name
      });
      
      // Store tokens and user
      await AuthService.setTokens({
        accessToken: response.access_token,
        refreshToken: response.refresh_token || response.access_token,
      });
      
      AuthService.setUser(response.user);
      
      set({ 
        user: response.user, 
        loading: false,
        initialized: true,
        lastAuthCheck: Date.now()
      });
      
      return response;
    } catch (error: any) {
      set({ 
        error: error?.message || "Registration failed", 
        loading: false,
        initialized: true
      });
      throw error;
    }
  },
  
  forgotPassword: async (email: string) => {
    set({ loading: true, error: null });
    try {
      await ApiAuthService.authenticationControllerForgotPassword({
        email
      });
      set({ loading: false });
    } catch (error: any) {
      set({ 
        error: error?.message || "Failed to process password reset request", 
        loading: false 
      });
      throw error;
    }
  },
  
  resetPassword: async (token: string, password: string) => {
    set({ loading: true, error: null });
    try {
      await ApiAuthService.authenticationControllerResetPassword({
        token,
        password
      });
      set({ loading: false });
    } catch (error: any) {
      set({ 
        error: error?.message || "Failed to reset password", 
        loading: false 
      });
      throw error;
    }
  },
  
  // User methods
  updateProfile: async (userData: Partial<UserDto>) => {
    set({ loading: true, error: null });
    try {
      const currentUser = get().user;
      if (!currentUser || !currentUser.id) {
        throw new Error("User not authenticated");
      }
      
      const updatedUser = await ApiAuthService.authenticationControllerUpdateProfile({
        ...userData,
        id: currentUser.id
      });
      
      AuthService.setUser(updatedUser);
      set({ user: updatedUser, loading: false });
      return updatedUser;
    } catch (error: any) {
      set({ 
        error: error?.message || "Failed to update profile", 
        loading: false 
      });
      throw error;
    }
  },
  
  // Session methods
  checkAuth: async () => {
    const now = Date.now();
    const lastCheck = get().lastAuthCheck;
    
    // Skip check if we checked recently
    if (now - lastCheck < MIN_AUTH_CHECK_INTERVAL) {
      return !!get().user;
    }
    
    set({ loading: true, error: null });
    try {
      const isAuthenticated = await AuthService.isAuthenticated();
      
      if (isAuthenticated) {
        const user = await AuthService.getCurrentUser();
        set({ 
          user, 
          loading: false, 
          initialized: true,
          lastAuthCheck: now
        });
        return true;
      } else {
        set({ 
          user: null, 
          loading: false, 
          initialized: true,
          lastAuthCheck: now
        });
        return false;
      }
    } catch (error) {
      set({ 
        user: null, 
        loading: false, 
        initialized: true,
        lastAuthCheck: now
      });
      return false;
    }
  },
  
  refreshSession: async () => {
    // Don't attempt to refresh if not authenticated
    if (!get().user) {
      return false;
    }
    
    try {
      const success = await AuthService.refreshToken();
      if (success) {
        const user = await AuthService.getCurrentUser();
        set({ 
          user,
          lastAuthCheck: Date.now()
        });
      }
      return success;
    } catch (error) {
      return false;
    }
  },
  
  // Role methods
  hasRole: (roles: UserRole | UserRole[]) => {
    const { user } = get();
    if (!user) return false;
    
    const userRole = user.role as UserRole;
    if (Array.isArray(roles)) {
      return roles.includes(userRole);
    }
    return userRole === roles;
  },
  
  isAdmin: () => {
    return get().hasRole("admin");
  },
  
  isModerator: () => {
    return get().hasRole(["admin", "moderator"]);
  }
}));