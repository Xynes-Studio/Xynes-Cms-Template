import React from "react";
import styles from "./textDetails.module.css";
import { AssetProps, Button, Flex, Text } from "lumia-ui";
import { LmBold } from "@/theme/icons/LmBold";
import { LmItalic } from "@/theme/icons/LmItalic";
import { LmOl } from "@/theme/icons/LmOl";
import { LmUl } from "@/theme/icons/LmUl";

export interface TextStylesProps {
  type: "BOLD" | "ITALIC" | "ordered-list-item" | "unordered-list-item";
  icon: React.FC<AssetProps>;
  title: string;
}

const textStyles: TextStylesProps[] = [
  {
    type: "BOLD",
    icon: LmBold,
    title: "Bold",
  },
  {
    type: "ITALIC",
    icon: LmItalic,
    title: "Italic",
  },
  {
    type: "ordered-list-item",
    icon: LmOl,
    title: "Ordered List",
  },
  {
    type: "unordered-list-item",
    icon: LmUl,
    title: "Unordered List",
  },
];

const TextDetails = () => {
  return (
    <Flex direction="column">
      <Text type="caption">Text Properties:</Text>
      <Flex className={styles.styles}>
        {textStyles.map((i: TextStylesProps) => {
          return <Button type="label" icon={i.icon} key={i.type} />;
        })}
      </Flex>
    </Flex>
  );
};

export default TextDetails;
