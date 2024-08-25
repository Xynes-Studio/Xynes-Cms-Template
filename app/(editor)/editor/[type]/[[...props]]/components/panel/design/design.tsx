import { Flex, Text } from "lumia-ui";
import styles from "./design.module.css";
import Elements from "./components/elements/elements";
import { useEditor } from "@/context/editor/editorProvider";
import { BlogRenderItem } from "@/context/editor/editor.type";
import TextDetails from "./components/elementDetails/textDetails/textDetails";
import ImageDetails from "./components/elementDetails/imageDetails/imageDetails";

const Design = () => {
  const { selectedItem, items } = useEditor();

  const type = selectedItem
    ? items.filter((i: BlogRenderItem) => i.id === selectedItem)[0].type
    : null;
  const value = selectedItem
    ? items.filter((i: BlogRenderItem) => i.id === selectedItem)[0].val
    : null;

  let ComponentToRender = Elements;

  if (type === "text") ComponentToRender = TextDetails;
  if (type === "image" && value?.length !== 0) ComponentToRender = ImageDetails;

  return (
    <Flex direction="column" className={styles.container}>
      <ComponentToRender />
    </Flex>
  );
};

export default Design;
