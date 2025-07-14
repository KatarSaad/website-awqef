"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface RootLayoutClientProps {
  children: React.ReactNode;
  fontClass: string;
}

export default function RootLayoutClient({
  children,
  fontClass,
}: RootLayoutClientProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
