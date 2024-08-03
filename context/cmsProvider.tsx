"use client";
import React from "react";
import { LumiaProvider } from "lumia-ui";
import { cmsTheme } from "@/theme/theme";
import { ThemeProvider } from "styled-components";

export const CMSProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <LumiaProvider theme={cmsTheme}>
      <ThemeProvider theme={cmsTheme}>{children}</ThemeProvider>
    </LumiaProvider>
  );
};
