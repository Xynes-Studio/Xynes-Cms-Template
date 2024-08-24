"use client";

import React, { createRef, MouseEvent, useEffect } from "react";
import { Flex } from "lumia-ui";
import { useParams } from "next/navigation";
import styles from "./editor.module.css";
import Panel from "./components/panel/panel";
import { useEditor } from "@/context/editor/editorProvider";
import WritingPad from "./components/writingPad/writingPad";

export const editorRef = createRef<HTMLDivElement>();


const Editor = () => {
  const params = useParams();
  const type = params.type;
  const props = params.props;
  const isUpdate = props.length > 1;
  const { setIsUpdate, setType, updateSelectedItem } = useEditor();

  useEffect(() => {
    setIsUpdate(isUpdate);
  }, [isUpdate, setIsUpdate]);

  useEffect(() => {
    if (typeof type === "string") {
      setType(type);
    }
  }, [type, setType]);

  const handleEditorClick = () => {
    updateSelectedItem(null);
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
