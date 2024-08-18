import { AssetProps, Flex, Tabs, Text } from "lumia-ui";
import styles from "./imageDetails.module.css";
import React from "react";
import { v4 as uuid } from "uuid";
import { useEditor } from "@/context/editor/editorProvider";
import { LmSmallImg } from "@/theme/icons/LmSmallImg";
import { LmBannerImg } from "@/theme/icons/LmBannerImg";
import { LmFullImg } from "@/theme/icons/LmFullImg";
import { ImageItem } from "../../../../../writingPad/components/imageRender/imageRender";
import { BlogRenderItem } from "@/context/editor/editor.type";

export interface ImageDetailsArrayProp {
  id: string;
  type: ImageItem["type"];
  title: string;
  icon: React.FC<AssetProps>;
}

const ImageDetailsArray: ImageDetailsArrayProp[] = [
  {
    id: uuid(),
    type: "small",
    title: "Small",
    icon: LmSmallImg,
  },
  {
    id: uuid(),
    type: "banner",
    title: "Banner",
    icon: LmBannerImg,
  },
  {
    id: uuid(),
    type: "fill",
    title: "Fill",
    icon: LmFullImg,
  },
];

const ImageDetails = () => {
  const { selectedItem, items, updateItem } = useEditor();

  const handleClick = (item: ImageDetailsArrayProp) => {
    const imageItem = items.filter(
      (i: BlogRenderItem) => i.id === selectedItem
    )[0];
    

    if (imageItem.type === "image" && selectedItem) {
      let ImgOBJ: ImageItem = JSON.parse(imageItem.val);
      ImgOBJ.type = item.type;

      console.log(ImgOBJ, "imageItem");
      updateItem(selectedItem, { val: JSON.stringify(ImgOBJ) });
    } else {
      return;
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the button from focusing
  };

  return (
    <Flex direction="column" className={styles.container}>
      <Text className={styles.caption} type="caption">
        ImageDetails:
      </Text>
      <Flex className={styles.wrapper} wrap>
        {ImageDetailsArray.map((item: ImageDetailsArrayProp) => {
          return (
            <Tabs
              direction="vertical"
              label={item.title}
              icon={item.icon}
              className={styles.element}
              onClick={() => handleClick(item)}
              onMouseDown={handleMouseDown}
              key={item.id}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ImageDetails;
