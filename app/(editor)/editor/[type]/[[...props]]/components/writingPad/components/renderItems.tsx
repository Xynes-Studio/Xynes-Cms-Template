import { BlogRenderItem } from "@/context/editor/editor.type";
import React from "react";
import TextRender from "./textRender/textRender";

const RenderItems: React.FC<{ item: BlogRenderItem }> = ({ item }) => {
  switch (item.type) {
    case "text":
      return <TextRender item={item} />;

    default:
      return <></>;
  }
};

export default RenderItems;
