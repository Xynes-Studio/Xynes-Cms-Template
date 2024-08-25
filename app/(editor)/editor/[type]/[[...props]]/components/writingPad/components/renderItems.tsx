import { BlogRenderItem } from "@/context/editor/editor.type";
import React from "react";
import TextRender from "./textRender/textRender";
import ImageEditor from "./imageRender/imageRender";
import YoutubeRender from "./youtubeRender/youtubeRender";

const RenderItems: React.FC<{ item: BlogRenderItem }> = ({ item }) => {
  switch (item.type) {
    case "text":
      return <TextRender item={item} />;
    case "image":
      return <ImageEditor item={item} />;
    case "youtube":
      return <YoutubeRender item={item} />;

    default:
      return <></>;
  }
};

export default RenderItems;
