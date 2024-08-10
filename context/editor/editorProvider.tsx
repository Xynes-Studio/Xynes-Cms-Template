import React, { createContext, useContext, useState, ReactNode } from "react";
import { BlogRenderItem, Meta } from "./editor.type";
import moment from "moment";

interface EditorContextType {
  items: BlogRenderItem[];
  addItem: (item: BlogRenderItem) => void;
  updateItem: (id: string, updatedItem: Partial<BlogRenderItem>) => void;
  deleteItem: (id: string) => void;
  isUpdate: boolean;
  setIsUpdate: (val: boolean) => void;
  type: string | null;
  setType: (val: string) => void;
  selectedTab: PanelTabProperties;
  setSelectedTab: (val: "Design" | "Meta") => void;
  meta: Meta;
  updateMeta: (updateMeta: Partial<Meta>) => void;
}

export type PanelTabProperties = "Design" | "Meta";

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const EditorProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [items, setItems] = useState<BlogRenderItem[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [type, setType] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<PanelTabProperties>("Meta");
  const [meta, setMeta] = useState<Meta>({
    title: "",
    author: "",
    datePublished: moment().format("YYYY MM DD"),
    tags: "",
    description: "",
    thumbnailUrl: "/image.webp",
    lastModified: moment().format("YYYY MM DD"),
  });

  const addItem = (item: BlogRenderItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const updateItem = (id: string, updatedItem: Partial<BlogRenderItem>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateMeta = (updatedMeta: Partial<Meta>) => {
    setMeta((prevMeta) => ({ ...prevMeta, ...updatedMeta }));
  };

  return (
    <EditorContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        isUpdate,
        setIsUpdate,
        type,
        setType,
        selectedTab,
        setSelectedTab,
        meta,
        updateMeta,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
};

export { EditorProvider, useEditor };
