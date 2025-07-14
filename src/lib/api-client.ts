import Router from "next/router";
import AuthService from "./auth";

// Utility to handle API errors and return a user-friendly message
export function handleApiError(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error)
    return (error as any).message;
  return "An unknown error occurred";
}

const API_BASE_URL =
  process.env.BACKEND_OPENAPI_URL || "http://localhost:3000/api";

class ApiClient {
  private baseURL: string;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    config: RequestInit & { url: string };
  }> = [];

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async refreshToken(): Promise<boolean> {
    if (this.isRefreshing) {
      return this.refreshPromise!;
    }

    this.isRefreshing = true;
    this.refreshPromise = AuthService.refreshToken();

    try {
      return await this.refreshPromise;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private processQueue(success: boolean): void {
    this.failedQueue.forEach((promise) => {
      if (success) {
        this.request(promise.config.url, promise.config)
          .then((response) => promise.resolve(response))
          .catch((error) => promise.reject(error));
      } else {
        promise.reject(new Error("Authentication failed"));
      }
    });
    this.failedQueue = [];
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Add auth token to headers if available
    const token = AuthService.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        headers,
        ...options,
      });

      // Handle 401 Unauthorized - Token expired or invalid
      if (response.status === 401) {
        // Dispatch unauthorized event
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("unauthorized"));
        }

        // If we're already refreshing, queue this request
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({
              resolve,
              reject,
              config: { ...options, url: endpoint },
            });
          }) as Promise<T>;
        }

        // Try to refresh the token
        const refreshSuccess = await this.refreshToken();

        if (refreshSuccess) {
          // Retry the original request with new token
          const newToken = AuthService.getToken();
          const newHeaders = {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          };

          // Retry the original request
          this.processQueue(true);
          return this.request<T>(endpoint, {
            ...options,
            headers: newHeaders,
          });
        } else {
          // Refresh failed, reject all queued requests
          this.processQueue(false);

          // Clear auth state
          AuthService.clearTokens();
          AuthService.clearUser();

          // Redirect to login
          if (
            typeof window !== "undefined" &&
            !window.location.pathname.startsWith("/login")
          ) {
            Router.push("/login");
          }

          throw new Error("Authentication failed");
        }
      }

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
export default ApiClient;
