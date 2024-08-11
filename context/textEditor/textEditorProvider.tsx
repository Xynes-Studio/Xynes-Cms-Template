import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useEditor } from "../editor/editorProvider";

interface TextEditorContextType {
  editorStates: { [key: string]: EditorState };
  setEditorState: (id: string, newEditorState: EditorState) => void;
  toggleBlockType: (id: string, blockType: string) => void;
  toggleInlineStyle: (id: string, inlineStyle: string) => void;
}

const TextEditorContext = createContext<TextEditorContextType | undefined>(undefined);

export const TextEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editorStates, setEditorStates] = useState<{ [key: string]: EditorState }>({});
  const { updateItem } = useEditor();

  // Debounce the updateItem function
  const debounceUpdate = useCallback(
    (id: string, contentState: EditorState) => {
      const htmlContent = stateToHTML(contentState.getCurrentContent());
      const debouncedUpdate = setTimeout(() => {
        updateItem(id, { val: htmlContent });
      }, 500); // 300ms debounce

      return () => clearTimeout(debouncedUpdate);
    },
    [updateItem]
  );

  const setEditorState = (id: string, newEditorState: EditorState) => {
    setEditorStates((prevStates) => ({ ...prevStates, [id]: newEditorState }));
    if (editorStates[id]) {
      debounceUpdate(id, newEditorState);
    }
  };

  const toggleBlockType = (id: string, blockType: string) => {
    const newState = RichUtils.toggleBlockType(editorStates[id], blockType);
    setEditorState(id, newState);
  };

  const toggleInlineStyle = (id: string, inlineStyle: string) => {
    const newState = RichUtils.toggleInlineStyle(editorStates[id], inlineStyle);
    setEditorState(id, newState);
  };

  return (
    <TextEditorContext.Provider
      value={{
        editorStates,
        setEditorState,
        toggleBlockType,
        toggleInlineStyle,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  );
};

export const useTextEditorContext = () => {
  const context = useContext(TextEditorContext);
  if (!context) {
    throw new Error(
      "useTextEditorContext must be used within a TextEditorProvider"
    );
  }
  return context;
};
