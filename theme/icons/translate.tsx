"use client";
import React from "react";
import { color as globalColor } from "../styles.ts";
import { AssetProps } from "./types/asset.types.ts";
import useIconSize from "./hooks/useIconSize.ts";

export const LmTranslateIcon: React.FC<AssetProps> = ({
  size = 1,
  color = globalColor.foreground,
  ...props
}) => {
  const [width, height] = useIconSize(24, 24, size);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.9 22L16.45 10H18.55L23.1 22H21L19.925 18.95H15.075L14 22H11.9ZM4 19L2.6 17.6L7.65 12.55C7.06667 11.9667 6.53733 11.3 6.062 10.55C5.58667 9.8 5.14933 8.95 4.75 8H6.85C7.18333 8.65 7.51667 9.21667 7.85 9.7C8.18333 10.1833 8.58333 10.6667 9.05 11.15C9.6 10.6 10.171 9.829 10.763 8.837C11.355 7.845 11.8007 6.89933 12.1 6H1V4H8V2H10V4H17V6H14.1C13.75 7.2 13.225 8.43333 12.525 9.7C11.825 10.9667 11.1333 11.9333 10.45 12.6L12.85 15.05L12.1 17.1L9.05 13.975L4 19ZM15.7 17.2H19.3L17.5 12.1L15.7 17.2Z"
        fill={color}
      />
    </svg>
  );
};
