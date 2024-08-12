"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmOl: React.FC<AssetProps> = ({
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
      <g clip-path="url(#a)"><path fill={color} d="M10.872 33.44a2.932 2.932 0 0 1 2.44 4.55 2.932 2.932 0 0 1-2.44 4.55c-1.3 0-2.326-.556-2.854-1.802a1.3 1.3 0 1 1 2.392-1.016.36.36 0 0 0 .33.218c.218 0 .46-.06.46-.334 0-.2-.146-.286-.312-.308l-.102-.008a1.3 1.3 0 0 1-.192-2.586l.192-.014c.204 0 .414-.074.414-.316 0-.274-.24-.334-.46-.334a.36.36 0 0 0-.328.22 1.3 1.3 0 1 1-2.394-1.018c.528-1.244 1.554-1.8 2.854-1.8zM40 36a2 2 0 0 1 0 4H18a2 2 0 1 1 0-4zM12.16 19.89a3.104 3.104 0 0 1 .86 4.884l-1.108 1.186h.94a1.3 1.3 0 0 1 0 2.6H9.146a1.31 1.31 0 0 1-1.31-1.308c0-.414.058-.798.354-1.114L11.118 23c.22-.234.164-.642-.12-.784-.272-.136-.498.02-.55.284l-.012.118a1.3 1.3 0 0 1-1.3 1.3c-.78 0-1.3-.654-1.3-1.394a2.964 2.964 0 0 1 4.324-2.634M40 22a2 2 0 0 1 .234 3.986L40 26H18a2 2 0 0 1-.234-3.986L18 22zM12.3 6.78v6.48a1.3 1.3 0 0 1-2.6 0V9.044a1.3 1.3 0 0 1-.92-2.366l1.484-.99a1.31 1.31 0 0 1 2.036 1.09zM40 8a2 2 0 0 1 .234 3.986L40 12H18a2 2 0 0 1-.234-3.986L18 8z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs>
    </svg>
  );
};