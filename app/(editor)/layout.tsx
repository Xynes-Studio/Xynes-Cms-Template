import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Create Blog",
  description: "A dynamic CMS set-up that adapts to different use cases.",
};

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
