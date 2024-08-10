"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmLeftAlign: React.FC<AssetProps> = ({
  size = 1,
  color = globalColor.foreground,
  ...props
}) => {
   const [width, height] = useIconSize(48, 48, size);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 14h36M6 24h24M6 34h8"/>
    </svg>
  );
};