"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const { t, language, isRTL } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(t("login.error.emailRequired"));
      return;
    }

    if (!password) {
      setError(t("login.error.passwordRequired"));
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual authentication logic
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!response.ok) {
        throw new Error(t("login.error.invalidCredentials"));
      }

      const data = await response.json();

      // Store token in localStorage if remember me is checked
      if (rememberMe && data.token) {
        localStorage.setItem("auth_token", data.token);
      }

      toast.success(t("login.successMessage"));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || t("login.error.serverError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-center items-center p-8 ${
          isRTL ? "order-2" : "order-1"
        }`}
      >
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt={t("common.logoAlt")}
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {t("login.title")}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{t("login.subtitle")}</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("login.email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("login.password")}
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  dir="ltr"
                />
              </div>

              <div className="flex items-center">
                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {t("login.rememberMe")}
                  </Label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("login.signIn")}...
                </div>
              ) : (
                t("login.signIn")
              )}
            </Button>
          </form>

          {/* Social login section removed */}

          {/* Sign up link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {t("login.noAccount")}{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-primary-dark"
              >
                {t("login.createAccount")}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div
        className={`w-full md:w-1/2 bg-primary-100 ${
          isRTL ? "order-1" : "order-2"
        }`}
      >
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-lg">
            <div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/images/login-hero.jpg"
                alt={t("login.heroImageAlt")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {t("login.platformTitle")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("login.platformDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
