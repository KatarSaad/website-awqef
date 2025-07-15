/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from "./ApiRequestOptions";

const TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: "include" | "omit" | "same-origin";
  TOKEN?: string | Resolver<string> | undefined;
  USERNAME?: string | Resolver<string> | undefined;
  PASSWORD?: string | Resolver<string> | undefined;
  HEADERS?: Headers | Resolver<Headers> | undefined;
  ENCODE_PATH?: ((path: string) => string) | undefined;
};

// Determine if we're in production based on the API URL
const isProduction = typeof window !== 'undefined' && 
  process.env.NEXT_PUBLIC_API_BASE_URL?.includes('api.awqef.sa');

export const OpenAPI: OpenAPIConfig = {
  BASE: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8888",
  VERSION: "1.0",
  WITH_CREDENTIALS: isProduction,
  CREDENTIALS: "include",
  TOKEN:
    typeof window !== "undefined"
      ? window.localStorage.getItem(TOKEN_KEY) || ""
      : "",
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: isProduction ? {
    'Content-Type': 'application/json',
  } : undefined,
  ENCODE_PATH: undefined,
};
