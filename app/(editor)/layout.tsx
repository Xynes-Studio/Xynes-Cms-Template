import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import '../globals.css';

export const metadata: Metadata = {
  title: "Create Blog",
  description: "A dynamic CMS set-up that adapts to different use cases.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--body",
});
const title = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--title",
});
const afronaut = localFont({
  src: [
    {
      path: "../fonts/Afronaut.otf",
    },
  ],
  variable: "--header",
});

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={[poppins.variable, afronaut.variable, title.variable].join(
          " "
        )}
      >
        {children}
      </body>
    </html>
  );
}
