import DropDown from "@/components/input/dropDown";
import { Language } from "../../../../../writingPad/components/codeRender/codeRender";
import { useEditor } from "@/context/editor/editorProvider";
import { BlogRenderItem } from "@/context/editor/editor.type";
import { Flex } from "lumia-ui";
import styles from "./codeDetails.module.css";
import { handleMouseDownChild } from "../textDetails/textDetails";

export const codeTypes: Language[] = [
  "html",
  "auto",
  "css",
  "JS",
  "js",
  "jsx",
  "javascript",
  "rust",
  "sql",
  "php",
  "python",
];

const CodeDetails = () => {
  const { selectedItem, items, updateItem } = useEditor();
  const item = items.filter((i: BlogRenderItem) => i.id === selectedItem)[0];

  const handleDDChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCodeType = e.target.value;
    if (selectedItem) updateItem(selectedItem, { lang: selectedCodeType });
  };
  return (
    <Flex className={styles.container} onClick={handleMouseDownChild}>
      <DropDown
        data={codeTypes}
        value={item.lang || 'auto'}
        onChange={handleDDChange}
        label="Select Code Language:"
      />
    </Flex>
  );
};

export default CodeDetails;
