"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmNewTab: React.FC<AssetProps> = ({
  size = 1,
  color = globalColor.foreground,
  ...props
}) => {
  const [width, height] = useIconSize(25, 24, size);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 25 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.15432 0.515544L2.13399 4.4265L17.6042 5.24924L0.181144 22.7744L6.90933 22.8752L20.3598 8.1678L20.2931 23.6598L24.1988 23.864L24.3141 1.67418L2.15432 0.515544Z"
        fill={color}
      />
    </svg>
  );
};
