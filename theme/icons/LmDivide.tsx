"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmDivide: React.FC<AssetProps> = ({
  size = 1,
  color = globalColor.foreground,
  ...props
}) => {
   const [width, height] = useIconSize(90, 90, size);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="90" height="90" fill="#E0E0E0" rx="10"/><path stroke="#3D3D3D" stroke-width="3" d="M45.5 23.5v45a1 1 0 1 1-2 0v-45a1 1 0 1 1 2 0Zm11.5 6h7a3.5 3.5 0 0 1 3.5 3.5v25a3.5 3.5 0 0 1-3.5 3.5h-7a3.5 3.5 0 0 1-3.5-3.5V33a3.5 3.5 0 0 1 3.5-3.5Zm-32 0h7a3.5 3.5 0 0 1 3.5 3.5v25a3.5 3.5 0 0 1-3.5 3.5h-7a3.5 3.5 0 0 1-3.5-3.5V33a3.5 3.5 0 0 1 3.5-3.5Z"/>
    </svg>
  );
};