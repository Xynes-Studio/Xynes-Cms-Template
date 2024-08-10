"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmAa: React.FC<AssetProps> = ({
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
      <rect width="90" height="90" fill="#E0E0E0" rx="10"/><path fill="#3D3D3D" d="M35.962 30.751a2.26 2.26 0 0 0-2.178-1.555h-.186a2.27 2.27 0 0 0-2.21 1.555L18.774 58.316a2 2 0 0 0-.218.917 1.555 1.555 0 0 0 1.556 1.556 1.74 1.74 0 0 0 1.68-1.198l3.236-7.233h17.11l3.236 7.14a1.93 1.93 0 0 0 1.742 1.29 1.68 1.68 0 0 0 1.68-1.68 2.5 2.5 0 0 0-.217-.886zm-9.504 18.465 7.14-15.898 7.155 15.898zM67.151 39.991a9.88 9.88 0 0 0-7.218-2.458 17.7 17.7 0 0 0-7.31 1.556 1.56 1.56 0 0 0-.903 1.384 1.555 1.555 0 0 0 1.462 1.431q.314-.011.607-.124a13.84 13.84 0 0 1 5.786-1.26c4.2 0 6.658 2.069 6.658 6.098v.777c-2.233-.65-4.55-.97-6.875-.948-5.662 0-9.551 2.504-9.551 7.217v.078c0 4.59 4.2 6.97 8.353 6.97a9.78 9.78 0 0 0 8.073-3.859v1.991a1.556 1.556 0 0 0 3.02.531c.073-.2.104-.412.091-.624V46.556a8.87 8.87 0 0 0-2.193-6.565M66.28 51.97c0 3.547-3.376 6.051-7.482 6.051-3.018 0-5.616-1.649-5.616-4.449v-.093c0-2.8 2.334-4.667 6.533-4.667 2.222.006 4.432.326 6.565.949z"/>
    </svg>
  );
};