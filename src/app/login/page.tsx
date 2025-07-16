"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const { login } = useAuthContext();
  const { t, language, setLanguage, isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push(from);
    } catch (err: any) {
      setError(err.message || t("login.error.invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-background-light px-4 ${
        isRTL ? "font-arabic" : "font-poppins"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md bg-paper rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary text-center w-full">
            {t("login.title")}
          </h2>
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="ml-2 text-secondary font-semibold px-2 py-1 rounded hover:bg-secondary/10 transition"
            aria-label="Switch language"
          >
            {language === "en" ? "AR" : "EN"}
          </button>
        </div>
        {error && (
          <div className="mb-4 rounded-lg bg-error/10 p-3 text-error text-center font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1"
            >
              {t("login.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-grey-200 px-4 py-2 text-foreground bg-background-light focus:ring-2 focus:ring-primary-400 transition placeholder:text-muted-foreground"
              placeholder={t("login.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-1"
            >
              {t("login.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-grey-200 px-4 py-2 text-foreground bg-background-light focus:ring-2 focus:ring-primary-400 transition placeholder:text-muted-foreground"
              placeholder={t("login.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" className="mr-2 accent-primary" />
              {t("login.rememberMe")}
            </label>
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              {t("login.forgotPassword")}
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-primary-300 shadow-md"
          >
            {isLoading ? t("login.signingIn") : t("login.signIn")}
          </button>
          <div className="text-center text-sm mt-4">
            {t("login.noAccount")}{" "}
            <Link href="/register" className="text-secondary hover:underline">
              {t("login.createAccount")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
