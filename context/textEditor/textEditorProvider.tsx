import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { DraftInlineStyle, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useEditor } from "../editor/editorProvider";
import { textTypes } from "@/app/(editor)/editor/[type]/[[...props]]/components/panel/design/components/elementDetails/textDetails/textDetails";

interface TextEditorContextType {
  editorStates: { [key: string]: EditorState };
  setEditorState: (id: string, newEditorState: EditorState) => void;
  toggleBlockType: (id: string, blockType: string) => void;
  toggleInlineStyle: (id: string, inlineStyle: string) => void;
  handleKeyCommand: (id: string, command: string) => void;
  currentInlineStyles: DraftInlineStyle | null;
  currentBlockType: string;
}

const TextEditorContext = createContext<TextEditorContextType | undefined>(
  undefined
);

export const TextEditorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [editorStates, setEditorStates] = useState<{
    [key: string]: EditorState;
  }>({});
  const { updateItem } = useEditor();
  const [currentInlineStyles, setCurrentInlineStyles] =
    useState<DraftInlineStyle | null>(null);
  const [currentBlockType, setCurrentBlockType] = useState<string>("");

  // Debounce the updateItem function
  const debounceUpdate = useCallback(
    (id: string, contentState: EditorState) => {
      const htmlContent = stateToHTML(contentState.getCurrentContent());
      const debouncedUpdate = setTimeout(() => {
        updateItem(id, { val: htmlContent });
      }, 500); // 500ms debounce

      return () => clearTimeout(debouncedUpdate);
    },
    [updateItem]
  );

  const setEditorState = (id: string, newEditorState: EditorState) => {
    setEditorStates((prevStates) => ({ ...prevStates, [id]: newEditorState }));

    const selectionState = newEditorState.getSelection();
    const contentState = newEditorState.getCurrentContent();

    // Update the current inline styles
    const inlineStyles = newEditorState.getCurrentInlineStyle();
    setCurrentInlineStyles(inlineStyles);

    // Update the current block type
    const blockType = contentState
      .getBlockForKey(selectionState.getStartKey())
      .getType();
    setCurrentBlockType(blockType);

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

  const handleKeyCommand = (id: string, command: string) => {
    const newState = RichUtils.handleKeyCommand(editorStates[id], command);
    if (newState) {
      setEditorState(id, newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <TextEditorContext.Provider
      value={{
        editorStates,
        setEditorState,
        toggleBlockType,
        toggleInlineStyle,
        handleKeyCommand,
        currentInlineStyles, // Provide the current inline styles in the context
        currentBlockType, // Provide the current block type in the context
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
