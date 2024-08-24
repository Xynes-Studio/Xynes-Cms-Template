import React, { createContext, useContext, useState, ReactNode } from "react";
import { BlogRenderItem, Meta } from "./editor.type";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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
  editingEnabled: boolean;
  setEditingEnabled: (val: boolean) => void;
  selectedItem: string | null;
  updateSelectedItem: (val: string | null) => void;
}


export type PanelTabProperties = "Design" | "Meta";

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const initialItems: BlogRenderItem[] = [];

const EditorProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [items, setItems] = useState<BlogRenderItem[]>(initialItems);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [editingEnabled, setEditingEnabled] = useState(true);
  const [type, setType] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<PanelTabProperties>("Meta");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
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

  const updateSelectedItem = (val:string | null) =>{
    setSelectedItem(val);
  }

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
        editingEnabled,
        setEditingEnabled,
        selectedItem,
        updateSelectedItem
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
