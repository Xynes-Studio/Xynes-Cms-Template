import React, { useEffect } from "react";
import styles from "./textDetails.module.css";
import { AssetProps, Button, Flex, Text } from "lumia-ui";
import { LmBold } from "@/theme/icons/LmBold";
import { LmItalic } from "@/theme/icons/LmItalic";
import { LmOl } from "@/theme/icons/LmOl";
import { LmUl } from "@/theme/icons/LmUl";
import { useTextEditorContext } from "@/context/textEditor/textEditorProvider";
import { useEditor } from "@/context/editor/editorProvider";

export interface TextStylesProps {
  type: "BOLD" | "ITALIC" | "ordered-list-item" | "unordered-list-item";
  icon: React.FC<AssetProps>;
  title: string;
  itemType: "block" | "inline";
}

const textStyles: TextStylesProps[] = [
  {
    type: "BOLD",
    icon: LmBold,
    title: "Bold",
    itemType: "inline",
  },
  {
    type: "ITALIC",
    icon: LmItalic,
    title: "Italic",
    itemType: "inline",
  },
  {
    type: "ordered-list-item",
    icon: LmOl,
    title: "Ordered List",
    itemType: "block",
  },
  {
    type: "unordered-list-item",
    icon: LmUl,
    title: "Unordered List",
    itemType: "block",
  },
];

const TextDetails = () => {
  const {
    toggleBlockType,
    toggleInlineStyle,
    currentBlockType,
    currentInlineStyles,
  } = useTextEditorContext();
  const { selectedItem } = useEditor();

  const handleTextStyleClicks = (item: TextStylesProps) => {
    if (selectedItem)
      if (item.itemType === "block") {
        toggleBlockType(selectedItem, item.type);
      } else {
        toggleInlineStyle(selectedItem, item.type);
      }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the button from focusing
  };

  return (
    <Flex className={styles.container} direction="column">
      <Text className={styles.caption} type="caption">
        Text Properties:
      </Text>
      <Flex className={styles.styles}>
        {textStyles.map((i: TextStylesProps) => {
          return (
            <Button
              onClick={() => handleTextStyleClicks(i)}
              onMouseDown={handleMouseDown}
              type={
                currentInlineStyles?.has(i.type) || currentBlockType === i.type
                  ? "fill"
                  : "label"
              }
              icon={i.icon}
              key={i.type}
              iconSize={0.5}
              backgroundColor="var(--accent100)"
              color={
                currentInlineStyles?.has(i.type) || currentBlockType === i.type
                  ? "var(--foregroundInverse)"
                  : "var(--foreground)"
              }
              className={styles.buttons}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default TextDetails;
