"use client";
import React from "react";
import { color as globalColor } from "../../styles.ts";
import { AssetProps } from "../types/asset.types.ts";
import useIconSize from "../hooks/useIconSize.ts";

export const LmLinkedIn: React.FC<AssetProps> = ({
  size = 1,
  color = globalColor.foreground,
  ...props
}) => {
  const [width, height] = useIconSize(45, 43, size);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 45 43`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.90416 5.45834C9.90355 6.67391 9.42008 7.83946 8.56011 8.69857C7.70014 9.55768 6.53411 10.04 5.31853 10.0394C4.10295 10.0388 2.93741 9.5553 2.07829 8.69533C1.21918 7.83536 0.736881 6.66933 0.737488 5.45375C0.738096 4.23818 1.22156 3.07263 2.08154 2.21352C2.94151 1.35441 4.10754 0.872104 5.32311 0.872712C6.53869 0.87332 7.70424 1.35679 8.56335 2.21676C9.42246 3.07673 9.90476 4.24276 9.90416 5.45834ZM10.0417 13.4333H0.874988V42.125H10.0417V13.4333ZM24.525 13.4333H15.4042V42.125H24.4333V27.0688C24.4333 18.6813 35.3646 17.9021 35.3646 27.0688V42.125H44.4167V23.9521C44.4167 9.8125 28.2375 10.3396 24.4333 17.2833L24.525 13.4333Z"
        fill={color}
      />
    </svg>
  );
};
