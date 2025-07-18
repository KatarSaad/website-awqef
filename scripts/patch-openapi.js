const fs = require("fs");
const path = require("path");

const openApiPath = path.join(
  __dirname,
  "../src/api/generated/core/OpenAPI.ts"
);

const customConfig = `
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

export const OpenAPI: OpenAPIConfig = {
  BASE: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8888",
  VERSION: "1.0",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN:
    typeof window !== "undefined"
      ? window.localStorage.getItem(TOKEN_KEY) || ""
      : "",
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
`;

fs.writeFileSync(openApiPath, customConfig.trim() + "\n");
console.log("Patched OpenAPI.ts with custom config!");
