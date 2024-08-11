"use client";

import { Flex } from "lumia-ui";
import { useParams } from "next/navigation";
import styles from "./editor.module.css";
import Panel from "./components/panel/panel";
import { useEditor } from "@/context/editor/editorProvider";
import { useEffect } from "react";
import WritingPad from "./components/writingPad/writingPad";

const Editor = () => {
  const params = useParams();
  const type = params.type;
  const props = params.props;
  const isUpdate = props.length > 1;
  const { setIsUpdate, setType } = useEditor();

  useEffect(() => {
    setIsUpdate(isUpdate);
  }, [isUpdate, setIsUpdate]);

  useEffect(() => {
    typeof type === "string" && setType(type);
  }, [type, setType]);

  return (
    <Flex className={styles.container}>
      <Flex direction='column' className={styles.editor}>
        <WritingPad/>
      </Flex>
      <Panel />
    </Flex>
  );
};

export default Editor;
