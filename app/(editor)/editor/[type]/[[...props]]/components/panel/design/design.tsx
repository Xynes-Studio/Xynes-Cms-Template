import { Flex, Text } from "lumia-ui";
import styles from "./design.module.css";
import Elements from "./components/elements/elements";
import { useEditor } from "@/context/editor/editorProvider";
import { BlogContentTypes, BlogRenderItem } from "@/context/editor/editor.type";
import TextDetails from "./components/elementDetails/textDetails/textDetails";
import { useEffect, useState } from "react";

const Design = () => {
  const { selectedItem, items } = useEditor();

  const type = selectedItem
    ? items.filter((i: BlogRenderItem) => i.id === selectedItem)[0].type
    : null;

  return (
    <Flex direction="column" className={styles.container}>
      {type === "text" && <TextDetails />}
      {type === null && <Elements />}
      {/* <Elements /> */}
    </Flex>
  );
};

export default Design;
