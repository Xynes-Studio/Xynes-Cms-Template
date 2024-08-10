"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmImage: React.FC<AssetProps> = ({
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
      <rect width="90" height="90" fill="#E0E0E0" rx="10"/><path stroke="#3D3D3D" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M70.293 39.305C51.565 36.732 35.415 50.638 36.5 69.083m-17-21.063c7.877-1.09 14.946 2.715 18.768 8.784m-8.851-23.137a5.666 5.666 0 1 0 11.332 0 5.666 5.666 0 0 0-11.332 0M19.5 37.633c0-6.346 0-9.52 1.235-11.945a11.33 11.33 0 0 1 4.953-4.953C28.113 19.5 31.287 19.5 37.633 19.5h14.734c6.346 0 9.52 0 11.945 1.235a11.33 11.33 0 0 1 4.953 4.953C70.5 28.113 70.5 31.287 70.5 37.633v14.734c0 6.346 0 9.52-1.235 11.945a11.33 11.33 0 0 1-4.953 4.953C61.887 70.5 58.713 70.5 52.367 70.5H37.633c-6.346 0-9.52 0-11.945-1.235a11.33 11.33 0 0 1-4.953-4.953C19.5 61.887 19.5 58.713 19.5 52.367z"/>
    </svg>
  );
};