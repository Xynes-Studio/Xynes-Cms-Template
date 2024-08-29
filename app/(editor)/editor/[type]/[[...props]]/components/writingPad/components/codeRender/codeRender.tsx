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
import { Button, Code, Flex } from "lumia-ui";

interface CodeEditorProps {
  item: BlogRenderItem;
}

export type Language =
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

const isValidLanguage = (lang: string): Language => {
  const languageArray: Language[] = [
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
  return languageArray.filter((i) => i === lang)[0] || "auto";
};

const CodeRender: React.FC<CodeEditorProps> = ({ item }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const { updateItem, updateSelectedItem, selectedItem } = useEditor();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (item.val.length > 0) {
      const contentState = stateFromHTML(item.val);
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
      if (editorRef?.current) {
        editorRef.current.focus();
      }
    }
    updateSelectedItem(item.id);
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
    updateItem(item.id, { val });
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    updateSelectedItem(item.id);
    setTimeout(() => {
      if (editorRef?.current) {
        editorRef.current.focus();
      }
    }, 100);
  };

  return (
    <Flex
      direction="column"
      onClick={handleContainerClick}
      className={styles.container}
    >
      <Button label={isValidLanguage(item.lang || "")} backgroundColor="rgba(0,0,0,0.2)"/>
      {selectedItem === item.id ? (
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
          language={isValidLanguage(item.lang || "")}
        />
      )}
    </Flex>
  );
};

export default CodeRender;
