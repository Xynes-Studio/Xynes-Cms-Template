"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmUl: React.FC<AssetProps> = ({
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
      <path fill="#000" d="M17.25 7.5h25.5a2.25 2.25 0 0 1 0 4.5h-25.5a2.25 2.25 0 0 1 0-4.5m0 15h25.5a2.25 2.25 0 0 1 0 4.5h-25.5a2.25 2.25 0 0 1 0-4.5m0 15h25.5a2.25 2.25 0 0 1 0 4.5h-25.5a2.25 2.25 0 0 1 0-4.5M6 42a3 3 0 1 1 0-6 3 3 0 0 1 0 6m3-18a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
    </svg>
  );
};