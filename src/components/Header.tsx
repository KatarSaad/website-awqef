"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  User,
  Building,
  Shield,
  Phone,
  Home,
  BookOpen,
  Briefcase,
  Users,
  LucideIcon,
  LogIn,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavigationItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  hasSubmenu?: boolean;
  submenu?: {
    title: string;
    href: string;
    icon?: LucideIcon;
  }[];
}

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const isRTL = language === "ar";

  // Check if user is admin
  const isAdmin = user?.roles?.[0] === "admin";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems: NavigationItem[] = [
    {
      title: t("nav.home") || "Home",
      href: "/",
      icon: Home,
    },

    {
      title: t("roles.admin") || "Admin",
      href: "/admin",
      icon: Shield,
    },

    {
      title: t("nav.projects") || "Projects",
      href: "/projects",
      icon: Briefcase,
    },
    {
      title: t("nav.investments") || "Investments",
      href: "/investments",
      icon: Briefcase,
    },
    {
      title: t("nav.organizations") || "Organizations",
      href: "/organizations",
      icon: Building,
    },
    {
      title: t("nav.blog") || "Blog",
      href: "/blog",
      icon: BookOpen,
    },
    {
      title: t("nav.about") || "About",
      href: "/about",
      hasSubmenu: true,
      icon: Users,
      submenu: [
        {
          title: t("nav.whoWeAre") || "Who We Are",
          href: "/who-we-are",
          icon: Users,
        },
        {
          title: t("nav.mission") || "Our Mission",
          href: "/about/mission",
          icon: Shield,
        },
        {
          title: t("nav.leadership") || "Leadership",
          href: "/about/leadership",
          icon: Building,
        },
      ],
    },
    {
      title: t("nav.contact") || "Contact",
      href: "/contact",
      icon: Phone,
    },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-r from-orange-500 to-orange-600 backdrop-blur-xl shadow-xl"
          : "bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center h-16 p-0 m-0 flex-shrink-0"
          >
            <Image
              src="/logo.svg"
              alt="Awqef Logo"
              width={180}
              height={60}
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList
              className={`flex items-center ${
                isRTL ? "space-x-reverse space-x-2" : "space-x-2"
              }`}
            >
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.hasSubmenu ? (
                    <>
                      <NavigationMenuTrigger
                        className={`flex items-center px-4 py-2 rounded-lg font-medium text-white hover:text-orange-600 hover:bg-white/90 transition-all duration-300 bg-transparent border-0 shadow-none data-[state=open]:bg-white/90 data-[state=open]:text-orange-600 ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                      >
                        {item.icon && (
                          <item.icon
                            size={18}
                            className={`transition-colors ${
                              isRTL ? "mr-0 ml-2" : "ml-0 mr-2"
                            } text-inherit`}
                          />
                        )}
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div
                          className={`w-64 p-4 bg-white rounded-xl border border-orange-100 shadow-xl ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {item.submenu?.map((subItem, subIndex) => (
                            <motion.div
                              key={subIndex}
                              whileHover={{ x: isRTL ? -4 : 4 }}
                              className="mb-1 last:mb-0"
                            >
                              <button
                                onClick={() => handleNavClick(subItem.href)}
                                className={`w-full flex items-center p-3 rounded-lg text-orange-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 font-medium ${
                                  isRTL
                                    ? "flex-row-reverse justify-end"
                                    : "justify-start"
                                }`}
                              >
                                {subItem.icon && (
                                  <subItem.icon
                                    size={18}
                                    className={`text-inherit ${
                                      isRTL ? "ml-3" : "mr-3"
                                    }`}
                                  />
                                )}
                                <span>{subItem.title}</span>
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium text-white hover:text-orange-600 hover:bg-white/90 transition-all duration-300 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      {item.icon && (
                        <item.icon
                          size={18}
                          className={`transition-colors ${
                            isRTL ? "mr-0 ml-2" : "ml-0 mr-2"
                          } text-inherit`}
                        />
                      )}
                      <span>{item.title}</span>
                    </motion.button>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Actions */}
          <div
            className={`hidden lg:flex items-center ${
              isRTL ? "space-x-reverse space-x-4" : "space-x-4"
            }`}
          >
            {/* Language Selector */}
            <Select
              value={language || "en"}
              onValueChange={(value: "en" | "ar") => setLanguage(value)}
            >
              <SelectTrigger className="w-28 bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 rounded-full text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/30">
                <div className="flex items-center">
                  <Globe size={16} className={isRTL ? "ml-2" : "mr-2"} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl border border-orange-100 shadow-xl">
                <SelectItem
                  value="en"
                  className="rounded-lg hover:bg-orange-50 focus:bg-orange-50 text-orange-700"
                >
                  🇺🇸 English
                </SelectItem>
                <SelectItem
                  value="ar"
                  className="rounded-lg hover:bg-orange-50 focus:bg-orange-50 text-orange-700"
                >
                  🇸🇦 العربية
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => logout()}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <LogOut size={16} className={isRTL ? "ml-2" : "mr-2"} />
                    {t("admin.logout") || "Logout"}
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div
                className={`flex items-center ${
                  isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleNavClick("/get-funded")}
                    variant="outline"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:border-white/50 font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {t("nav.getFunded") || "Get Funded"}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleNavClick("/invest-now")}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {t("nav.investNow") || "Invest Now"}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleNavClick("/login")}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <LogIn size={16} className={isRTL ? "ml-2" : "mr-2"} />
                    {t("nav.login") || "Login"}
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white border-t border-orange-100 shadow-lg"
        >
          <div className="container mx-auto py-4 px-4">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.hasSubmenu ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`flex items-center justify-between p-3 rounded-lg text-orange-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 ${
                          isRTL ? "flex-row-reverse text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`flex items-center ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          {item.icon && (
                            <item.icon
                              size={18}
                              className={`text-inherit ${
                                isRTL ? "ml-2" : "mr-2"
                              }`}
                            />
                          )}
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown size={16} className="text-inherit" />
                      </button>
                      <div
                        className={`ml-4 ${
                          isRTL ? "mr-4 ml-0" : ""
                        } mt-1 border-l-2 border-orange-200 pl-4 ${
                          isRTL ? "pr-4 pl-0 border-r-2 border-l-0" : ""
                        }`}
                      >
                        {item.submenu?.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() => handleNavClick(subItem.href)}
                            className={`flex items-center p-3 w-full rounded-lg text-orange-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 ${
                              isRTL
                                ? "flex-row-reverse text-right"
                                : "text-left"
                            }`}
                          >
                            {subItem.icon && (
                              <subItem.icon
                                size={16}
                                className={`text-inherit ${
                                  isRTL ? "ml-2" : "mr-2"
                                }`}
                              />
                            )}
                            <span>{subItem.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center p-3 w-full rounded-lg text-orange-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 ${
                        isRTL ? "flex-row-reverse text-right" : "text-left"
                      }`}
                    >
                      {item.icon && (
                        <item.icon
                          size={18}
                          className={`text-inherit ${isRTL ? "ml-2" : "mr-2"}`}
                        />
                      )}
                      <span>{item.title}</span>
                    </button>
                  )}
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-2 border-t border-orange-100 mt-2">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => handleNavClick("/dashboard")}
                      variant="outline"
                      className={`w-full justify-center bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 font-medium ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <User size={16} className={isRTL ? "ml-2" : "mr-2"} />
                      {t("nav.dashboard") || "Dashboard"}
                    </Button>
                    <Button
                      onClick={() => logout()}
                      className={`w-full justify-center bg-orange-600 text-white hover:bg-orange-700 font-medium ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <LogOut size={16} className={isRTL ? "ml-2" : "mr-2"} />
                      {t("admin.logout") || "Logout"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => handleNavClick("/get-funded")}
                      variant="outline"
                      className="w-full justify-center bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 font-medium"
                    >
                      {t("nav.getFunded") || "Get Funded"}
                    </Button>
                    <Button
                      onClick={() => handleNavClick("/invest-now")}
                      className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      {t("nav.investNow") || "Invest Now"}
                    </Button>
                    <Button
                      onClick={() => handleNavClick("/login")}
                      className={`w-full justify-center bg-orange-600 text-white hover:bg-orange-700 font-medium ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <LogIn size={16} className={isRTL ? "ml-2" : "mr-2"} />
                      {t("nav.login") || "Login"}
                    </Button>
                  </div>
                )}

                {/* Mobile Language Selector */}
                <div className="mt-4 flex justify-center">
                  <Select
                    value={language || "en"}
                    onValueChange={(value: "en" | "ar") => setLanguage(value)}
                  >
                    <SelectTrigger className="w-full bg-white border border-orange-200 hover:border-orange-300 rounded-lg text-orange-700 font-medium">
                      <div className="flex items-center">
                        <Globe size={16} className={isRTL ? "ml-2" : "mr-2"} />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl border border-orange-100 shadow-xl">
                      <SelectItem
                        value="en"
                        className="rounded-lg hover:bg-orange-50 focus:bg-orange-50 text-orange-700"
                      >
                        🇺🇸 English
                      </SelectItem>
                      <SelectItem
                        value="ar"
                        className="rounded-lg hover:bg-orange-50 focus:bg-orange-50 text-orange-700"
                      >
                        🇸🇦 العربية
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
