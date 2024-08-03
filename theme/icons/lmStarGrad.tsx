"use client";
import React from "react";
import useIconSize from "./hooks/useIconSize.ts";
import { AssetProps } from "./types/asset.types.ts";

export const LmStartGrad: React.FC<AssetProps> = ({
  size = 1,
  ...props
}) => {
  const [width, height] = useIconSize(1728, 778, size);
    
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 1728 778`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_f_331_44)">
        <path
          d="M907.5 500L1083.58 646.605L1359.73 706.604L1192.4 857.21L1186.99 1040.9L907.5 987.37L628.008 1040.9L622.597 857.21L455.273 706.604L731.42 646.605L907.5 500Z"
          fill="#FF7676"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_331_44"
          x="-44.7274"
          y="0"
          width="1904.45"
          height="1540.9"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="250"
            result="effect1_foregroundBlur_331_44"
          />
        </filter>
      </defs>
    </svg>
  );
};
