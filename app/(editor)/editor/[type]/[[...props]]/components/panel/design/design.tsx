import { Button, Flex, LmCkDelete, Text } from "lumia-ui";
import styles from "./design.module.css";
import Elements from "./components/elements/elements";
import { useEditor } from "@/context/editor/editorProvider";
import { BlogRenderItem } from "@/context/editor/editor.type";
import TextDetails from "./components/elementDetails/textDetails/textDetails";
import ImageDetails from "./components/elementDetails/imageDetails/imageDetails";
import YoutubeDetails from "./components/youtubeDetails/youtubeDetails";

const Design = () => {
  const { selectedItem, items, updateSelectedItem, deleteItem } = useEditor();

  const type = selectedItem
    ? items.filter((i: BlogRenderItem) => i.id === selectedItem)[0].type
    : null;
  const value = selectedItem
    ? items.filter((i: BlogRenderItem) => i.id === selectedItem)[0].val
    : null;

  let ComponentToRender = Elements;

  if (type === "text") ComponentToRender = TextDetails;
  if (type === 'youtube') ComponentToRender = YoutubeDetails;
  if (type === "image" && value?.length !== 0) ComponentToRender = ImageDetails;

  return (
    <Flex direction="column" className={styles.container}>
      <ComponentToRender />
      {type && (
        <Button
          label="Delete"
          className={styles.delete}
          icon={LmCkDelete}
          backgroundColor="var(--warning)"
          onClick={() => {
            if (selectedItem) {
              updateSelectedItem(null);
              deleteItem(selectedItem);
            }
          }}
        />
      )}
    </Flex>
  );
};

export default Design;
