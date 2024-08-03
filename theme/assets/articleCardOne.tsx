"use client";
import React from "react";
import { AssetProps } from "@/component/buttons/button.types.ts";
import useIconSize from "../icons/hooks/useIconSize.ts";

export const ArticleCardOne: React.FC<AssetProps> = ({
  size = 1,
  ...props
}) => {
  const [width, height] = useIconSize(964, 647, size);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 964 647`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M582.69 362.49C582.69 15.8342 156.685 0 0 0H964V647C855.494 647 582.69 661 582.69 362.49Z"
        fill="url(#bg-pattern)"
      />
      <defs>
        <pattern
          id="bg-pattern"
          patternUnits="userSpaceOnUse"
          width={964}
          height={647}
        >
          <image
            href="/images/grad.webp"
            x="0"
            y="0"
            width={964}
            height={647}
            preserveAspectRatio="xMidYMid slice" 
          />
        </pattern>
      </defs>
    </svg>
  );
};
