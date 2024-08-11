import { AssetProps, Flex, Tabs, Text } from "lumia-ui";
import styles from "./elements.module.css";
import { BlogContentTypes, BlogRenderItem } from "@/context/editor/editor.type";
import React from "react";
import { v4 as uuid } from "uuid";
import { LmAa } from "@/theme/icons/LmAa";
import { LmImage } from "@/theme/icons/LmImage";
import { LmYt } from "@/theme/icons/LmYt";
import { LmCode } from "@/theme/icons/LmCode";
import { LmDivide } from "@/theme/icons/LmDivide";
import { useEditor } from "@/context/editor/editorProvider";

export interface ElementsArrayProp {
  id: string;
  type: BlogContentTypes;
  title: string;
  icon: React.FC<AssetProps>;
}

const ElementsArray: ElementsArrayProp[] = [
  {
    id: uuid(),
    type: "text",
    title: "Text",
    icon: LmAa,
  },
  {
    id: uuid(),
    type: "image",
    title: "Image",
    icon: LmImage,
  },
  {
    id: uuid(),
    type: "youtube",
    title: "YouTube",
    icon: LmYt,
  },
  {
    id: uuid(),
    type: "code",
    title: "Code",
    icon: LmCode,
  },
  {
    id: uuid(),
    type: "divider",
    title: "Divider",
    icon: LmDivide,
  },
];

const Elements = () => {
  const { addItem } = useEditor();

  const handleAdd = (item: ElementsArrayProp) => {
    let obj: BlogRenderItem = {
      id: uuid(),
      type: item.type,
      val: "",
    };

    if (item.type === "text") {
      obj["placeholder"] = "Start typing here...";
    }
    addItem(obj);
  };

  return (
    <Flex direction="column" className={styles.container}>
      <Text className={styles.caption} type="caption">
        Elements:
      </Text>
      <Flex className={styles.wrapper} wrap>
        {ElementsArray.map((item: ElementsArrayProp) => {
          return (
            <Tabs
              direction="vertical"
              label={item.title}
              key={item.id}
              icon={item.icon}
              className={styles.element}
              onClick={() => handleAdd(item)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Elements;
