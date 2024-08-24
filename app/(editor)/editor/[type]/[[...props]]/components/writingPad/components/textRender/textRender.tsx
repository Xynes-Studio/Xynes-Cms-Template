import React, { useEffect, useRef } from "react";
import { Editor, EditorState } from "draft-js";
import { BlogRenderItem } from "@/context/editor/editor.type";
import { useTextEditorContext } from "@/context/textEditor/textEditorProvider";
import { stateFromHTML } from "draft-js-import-html";
import { useEditor } from "@/context/editor/editorProvider";
import styles from "./textRender.module.css";
import { blockStyleFn } from "./returnEditorClass";
import "./textEditor.css";
import { handleMouseDownChild } from "../../../panel/design/components/elementDetails/textDetails/textDetails";
interface TextEditorProps {
  item: BlogRenderItem;
}

const TextEditor: React.FC<TextEditorProps> = ({ item }) => {
  const { editorStates, setEditorState } = useTextEditorContext();
  const { editingEnabled, updateSelectedItem, deleteItem } = useEditor();
  const id = item.id;
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (!editorStates[id]) {
      if (item.val.length > 0) {
        const contentState = stateFromHTML(item.val);
        setEditorState(id, EditorState.createWithContent(contentState));
      } else {
        setEditorState(id, EditorState.createEmpty());
      }
    }
  }, [id, item, editorStates, setEditorState]);

  useEffect(() => {
    setTimeout(() => {
      if (editorRef.current) {
        editorRef?.current?.focus();
      }
    }, 300);
  }, [editorRef]);

  if (!editorStates[id] && editingEnabled) {
    return null; // Render nothing until the editor state is initialized
  }

  const onChange = (newEditorState: EditorState) => {
    setEditorState(id, newEditorState);
  };

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    event.stopPropagation();
    updateSelectedItem(id);
    if (editorStates[id]) {
      setEditorState(id, editorStates[id]);
    }
  };

  const handleBlur = () => {
    if (editorStates[id]) {
      const val = editorStates[id].getCurrentContent().getPlainText();

      setTimeout(() => {
        val.length === 0 && deleteItem(item.id);
      }, 300);
    }
  };

  return (
    <div onClick={handleMouseDownChild} className={styles.wrapper}>
      {editingEnabled ? (
        <Editor
          ref={editorRef}
          editorState={editorStates[id]}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blockStyleFn={blockStyleFn}
          placeholder={item.placeholder}
        />
      ) : (
        <div
          className={styles.viewer}
          dangerouslySetInnerHTML={{ __html: item.val }}
        />
      )}
    </div>
  );
};

export default TextEditor;
