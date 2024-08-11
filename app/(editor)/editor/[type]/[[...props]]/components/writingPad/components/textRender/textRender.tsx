import React, { useEffect } from "react";
import { Editor, EditorState } from "draft-js";
import { BlogRenderItem } from "@/context/editor/editor.type";
import { useTextEditorContext } from "@/context/textEditor/textEditorProvider";
import { stateFromHTML } from "draft-js-import-html";
import { useEditor } from "@/context/editor/editorProvider";
import styles from './textRender.module.css';
import { blockStyleFn } from "./returnEditorClass";
import './textEditor.css';
interface TextEditorProps {
  item: BlogRenderItem;
}

const TextEditor: React.FC<TextEditorProps> = ({ item }) => {
  const { editorStates, setEditorState } = useTextEditorContext();
  const { editingEnabled } = useEditor();
  const id = item.id;

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

  if (!editorStates[id] && editingEnabled) {
    return null; // Render nothing until the editor state is initialized
  }

  const onChange = (newEditorState: EditorState) => {
    setEditorState(id, newEditorState);
  };

  return (
    <div
      className={styles.wrapper}
    >
      {editingEnabled ? (
        <Editor
          editorState={editorStates[id]}
          onChange={onChange}
          blockStyleFn={blockStyleFn}
          placeholder={item.placeholder}
        />
      ) : (
        <div  className={styles.viewer} dangerouslySetInnerHTML={{ __html: item.val }} />
      )}
    </div>
  );
};

export default TextEditor;
