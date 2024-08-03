import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CMSProvider } from "@/context/cmsProvider";
import ClientOnly from "./client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--body",
});
const lufga = localFont({
  src: [
    {
      path: "fonts/lufga-100.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "fonts/lufga-600.otf",
      weight: "600",
      style: "bold",
    },
    {
      path: "fonts/lufga-semi.otf",
      weight: "400",
      style: "medium",
    },
  ],
  variable: "--title",
});
const afronaut = localFont({
  src: [
    {
      path: "fonts/Afronaut.otf",
    },
  ],
  variable: "--header",
});

export const metadata: Metadata = {
  title: "Xynes CMS",
  description: "A dynamic CMS set-up that adapts to different use cases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={[poppins.variable, afronaut.variable, lufga.variable].join(
          " "
        )}
      >
        <CMSProvider>
          <ClientOnly>{children}</ClientOnly>
        </CMSProvider>
      </body>
    </html>
  );
}
