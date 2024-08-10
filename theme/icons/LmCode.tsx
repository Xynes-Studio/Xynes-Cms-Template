"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmCode: React.FC<AssetProps> = ({
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
      <rect width="90" height="90" fill="#E0E0E0" rx="10"/><path fill="#3D3D3D" d="M34.44 39.229 27.514 45l6.926 5.771a2.25 2.25 0 1 1-2.88 3.458l-9-7.5a2.25 2.25 0 0 1 0-3.458l9-7.5a2.25 2.25 0 0 1 2.88 3.458m33 4.042-9-7.5a2.25 2.25 0 0 0-3.183.277 2.25 2.25 0 0 0 .303 3.18L62.486 45l-6.926 5.771a2.25 2.25 0 1 0 2.88 3.458l9-7.5a2.25 2.25 0 0 0 0-3.458M51.769 26.385a2.25 2.25 0 0 0-2.884 1.346l-12 33a2.25 2.25 0 0 0 4.23 1.538l12-33a2.25 2.25 0 0 0-1.346-2.884"/>
    </svg>
  );
};