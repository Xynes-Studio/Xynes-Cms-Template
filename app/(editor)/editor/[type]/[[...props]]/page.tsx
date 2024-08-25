"use client";

import React, { createRef, MouseEvent, useEffect } from "react";
import { Flex } from "lumia-ui";
import { useParams } from "next/navigation";
import styles from "./editor.module.css";
import Panel from "./components/panel/panel";
import { useEditor } from "@/context/editor/editorProvider";
import WritingPad from "./components/writingPad/writingPad";
import { useTextEditorContext } from "@/context/textEditor/textEditorProvider";
import { BlogRenderItem } from "@/context/editor/editor.type";

export const editorRef = createRef<HTMLDivElement>();

const Editor = () => {
  const params = useParams();
  const type = params.type;
  const props = params.props;
  const isUpdate = props.length > 1;
  const {
    setIsUpdate,
    setType,
    updateSelectedItem,
    selectedItem,
    items,
    deleteItem,
  } = useEditor();
  const { editorStates } = useTextEditorContext();

  useEffect(() => {
    setIsUpdate(isUpdate);
  }, [isUpdate, setIsUpdate]);

  useEffect(() => {
    if (typeof type === "string") {
      setType(type);
    }
  }, [type, setType]);

  /**Here we handle all the different blurs while editing text */

  const typeOfSelectedItem = selectedItem
    ? items.filter((i: BlogRenderItem) => i.id === selectedItem)[0].type
    : null;
  const valueOfSelectedItem = selectedItem
    ? items.filter((i: BlogRenderItem) => i.id === selectedItem)[0].val
    : null;

  const handleDefaultBlur = () => {
    if (selectedItem && valueOfSelectedItem?.length === 0) {
      updateSelectedItem(null);
      deleteItem(selectedItem);
    } else {
      updateSelectedItem(null);
    }
  };

  const handleTextBlur = () => {
    if (selectedItem && editorStates[selectedItem]) {
      const val = editorStates[selectedItem].getCurrentContent().getPlainText();
      if (val.length === 0) {
        updateSelectedItem(null);
        deleteItem(selectedItem);
      }
    }
  };

  const handleEditorClick = () => {
    switch (typeOfSelectedItem) {
      case "text":
        handleTextBlur();
        break;
      default:
        handleDefaultBlur();
        break;
    }
  };

  return (
    <Flex
      onClick={handleEditorClick}
      ref={editorRef}
      className={styles.container}
    >
      <Flex direction="column" className={styles.editor}>
        <WritingPad />
      </Flex>
      <Panel />
    </Flex>
  );
};

// Export the ref along with the Editor component
export default Editor;
