"use client";
import React from "react";
import { AssetProps } from "@/component/buttons/button.types.ts";
import useIconSize from "../icons/hooks/useIconSize.ts";

export const ArticleCardTwo: React.FC<AssetProps> = ({
  size = 1,
  ...props
}) => {
  const [width, height] = useIconSize(928, 623, size);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 928 623`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M367.071 348.989C367.071 15.2444 777.166 0 928 0H-2.14577e-06V622.901C104.454 622.901 367.071 636.379 367.071 348.989Z"
        fill="url(#bg-pattern-2)"
      />
      <defs>
        <pattern
          id="bg-pattern-2"
          patternUnits="userSpaceOnUse"
          width={928}
          height={623}
        >
          <image
            href="/images/grad2.webp"
            x="0"
            y="0"
            width={928}
            height={623}
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
    </svg>
  );
};
