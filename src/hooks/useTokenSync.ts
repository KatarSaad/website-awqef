"use client";

import { useEffect } from "react";
import { OpenAPI } from "@/api/generated/core/OpenAPI";
import AuthService from "@/lib/auth";

/**
 * This hook ensures the token is always available for API requests
 */
export function useTokenSync() {
  useEffect(() => {
    // Set token on mount
    const token = AuthService.getToken();
    if (token) {
      OpenAPI.TOKEN = token;
    }

    // Set up listener for token changes
    const interval = setInterval(() => {
      const currentToken = AuthService.getToken();
      if (currentToken) {
        OpenAPI.TOKEN = currentToken;
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return null;
}