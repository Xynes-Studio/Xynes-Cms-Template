import { Flex } from "lumia-ui";
import styles from "./writingPad.module.css";
import { useEditor } from "@/context/editor/editorProvider";
import { BlogRenderItem } from "@/context/editor/editor.type";
import RenderItems from "./components/renderItems";
import TitleRender from "../titleRender/titleRender";

const WritingPad = () => {
  const { items } = useEditor();
  return (
    <Flex direction="column" className={styles.container}>
      <TitleRender />
      <Flex direction="column" className={styles.writingWrapper}>
        {items.map((item: BlogRenderItem) => {
          return <RenderItems item={item} key={item.id} />;
        })}
      </Flex>
    </Flex>
  );
};
export default WritingPad;
