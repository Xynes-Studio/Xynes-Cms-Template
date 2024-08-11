import { Flex } from "lumia-ui";
import styles from "./writingPad.module.css";
import { useEditor } from "@/context/editor/editorProvider";
import { BlogRenderItem } from "@/context/editor/editor.type";
import RenderItems from "./components/renderItems";

const WritingPad = () => {
  const { items } = useEditor();
  return (
    <Flex className={styles.container}>
      {items.map((item: BlogRenderItem) => {
        return <RenderItems item={item} key={item.id} />;
      })}
    </Flex>
  );
};
export default WritingPad;
