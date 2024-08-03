"use client";
import React from "react";
import { AssetProps } from "@/component/buttons/button.types.ts";
import useIconSize from "../icons/hooks/useIconSize.ts";

export const StarGold: React.FC<AssetProps> = ({
  size = 1,
  ...props
}) => {
  const [width, height] = useIconSize(100, 100, size);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 100 100`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50 0L51.8227 43.2296C51.8586 44.0797 52.8721 44.4995 53.4985 43.9238L85.3553 14.6447L56.0762 46.5015C55.5005 47.1279 55.9203 48.1414 56.7704 48.1773L100 50L56.7704 51.8227C55.9203 51.8586 55.5005 52.8721 56.0762 53.4985L85.3553 85.3553L53.4985 56.0762C52.8721 55.5005 51.8586 55.9203 51.8227 56.7704L50 100L48.1773 56.7704C48.1414 55.9203 47.1279 55.5005 46.5015 56.0762L14.6447 85.3553L43.9238 53.4985C44.4995 52.8721 44.0797 51.8586 43.2296 51.8227L0 50L43.2296 48.1773C44.0797 48.1414 44.4995 47.1279 43.9238 46.5015L14.6447 14.6447L46.5015 43.9238C47.1279 44.4995 48.1414 44.0797 48.1773 43.2296L50 0Z"
        fill="#FFF100"
      />
    </svg>
  );
};
