"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { OpenAPI } from "@/api/generated/core/OpenAPI";
import AuthService from "@/lib/auth";
import { useTokenSync } from "@/hooks/useTokenSync";

interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const { user, initialized } = useAuthContext();
  
  // Use the token sync hook
  useTokenSync();

  // Update OpenAPI configuration when auth state changes
  useEffect(() => {
    if (initialized) {
      // Update the OpenAPI TOKEN with the current token
      const token = AuthService.getToken();
      OpenAPI.TOKEN = token || "";
    }
  }, [user, initialized]);

  // Listen for token changes in localStorage
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth_token") {
        OpenAPI.TOKEN = event.newValue || "";
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  // Force token refresh on mount
  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      OpenAPI.TOKEN = token;
    }
  }, []);

  return <>{children}</>;
};
