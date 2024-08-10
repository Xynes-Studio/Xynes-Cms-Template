"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmBold: React.FC<AssetProps> = ({
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
      <path fill="#000" d="M21.36 2.4c5.76 0 10.08.72 12.96 2.4 3.12 1.68 4.56 4.56 4.56 8.64 0 2.4-.72 4.56-1.68 6.24a7.2 7.2 0 0 1-4.8 3.12c1.372.32 2.674.89 3.84 1.68.96.72 1.92 1.92 2.64 3.12a12 12 0 0 1 .96 5.52 11.04 11.04 0 0 1-4.08 9.12A18.24 18.24 0 0 1 24 45.6H7.92V2.4zm.96 17.04c2.64 0 4.56-.24 5.52-1.2 1.2-.72 1.68-2.16 1.68-3.6 0-1.68-.72-2.88-1.92-3.6s-3.12-1.2-5.76-1.2h-4.8v9.6zm-5.28 7.2V38.4h6c2.64 0 4.8-.72 5.76-1.68 1.2-1.2 1.68-2.4 1.68-4.32a4.8 4.8 0 0 0-1.68-3.84c-1.2-.96-3.12-1.44-6-1.44h-6z"/>
    </svg>
  );
};