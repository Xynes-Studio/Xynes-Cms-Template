import {
  ContentBlock,
  DraftHandleValue,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import styles from "./codeRender.module.css";
import { useEffect, useRef, useState } from "react";
import { useEditor } from "@/context/editor/editorProvider";
import { BlogRenderItem } from "@/context/editor/editor.type";
import { stateFromHTML } from "draft-js-import-html";
import { Code, Flex } from "lumia-ui";

interface CodeEditorProps {
  item: BlogRenderItem;
}

type Language =
  | "html"
  | "auto"
  | "css"
  | "JS"
  | "js"
  | "jsx"
  | "javascript"
  | "rust"
  | "sql"
  | "php"
  | "python";

const isValidLanguage = (lang: string): lang is Language => {
  return [
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
  ].includes(lang);
};

const CodeRender: React.FC<CodeEditorProps> = ({ item }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [canEdit, setCanEdit] = useState(true);
  const { updateItem, updateSelectedItem } = useEditor();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (item.val.length > 0) {
      const contentState = stateFromHTML(item.val);
      setEditorState(EditorState.createWithContent(contentState));
      setCanEdit(false);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  useEffect(() => {
    setEditorState(RichUtils.toggleBlockType(editorState, "code-block"));
  }, []);

  const handleBlur = () => {
    const val = editorState.getCurrentContent().getPlainText();
    setCanEdit(false);
    updateItem(item.id, { val });
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    updateSelectedItem(item.id);
    if (!canEdit) {
      setCanEdit(true);
      setTimeout(() => {
        if (editorRef?.current) {
          editorRef.current.focus();
        }
      }, 100);
    } else {
      if (editorRef?.current) {
        editorRef.current.focus();
      }
    }
  };

  return (
    <Flex onClick={handleContainerClick} className={styles.container}>
      {canEdit ? (
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          onBlur={handleBlur}
          placeholder={item.placeholder}
        />
      ) : (
        <Code
          code={item.val}
          className={styles.code}
          language={
            item.lang && isValidLanguage(item.lang) ? item.lang : "auto"
          }
        />
      )}
    </Flex>
  );
};

export default CodeRender;
