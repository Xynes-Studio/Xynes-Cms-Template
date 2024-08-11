import { Flex, Text } from "lumia-ui";
import styles from "./design.module.css";
import Elements from "./components/elements/elements";
import { useEditor } from "@/context/editor/editorProvider";
import { BlogContentTypes, BlogRenderItem } from "@/context/editor/editor.type";
import TextDetails from "./components/elementDetails/textDetails/textDetails";
import { useEffect, useState } from "react";

const Design = () => {
  const { selectedItem, items } = useEditor();
  const [type, setType] = useState<BlogContentTypes | null>(null);
  // const type = items.filter((i: BlogRenderItem) => i.id === selectedItem)[0]
  //   .type;

  // useEffect(() => {
  //   console.log(type, "type");
  // }, [type]);

  useEffect(() => {
    if (selectedItem) {
      const type = items.filter((i: BlogRenderItem) => i.id === selectedItem)[0]
        .type;
      console.log("type", type);

      setType(type || null);
    } else {
      setType(null);
    }
  }, [selectedItem, items, setType]);

  return (
    <Flex direction="column" className={styles.container}>
      {type === "text" && <TextDetails />}
      {type === null && <Elements />}
      {/* <Elements /> */}
    </Flex>
  );
};

export default Design;
