import React, { createContext, useContext, useState, ReactNode } from "react";
import { ListItem } from "./list.model";

interface ListDataContextType {
  items: ListItem[];
  addItem: (item: ListItem) => void;
  updateItem: (id: string, updatedItem: Partial<ListItem>) => void;
  deleteItem: (id: string) => void;
  getItemsByType: (type: string) => ListItem[];
  getItemById: (id: string) => ListItem | undefined;
  addListItems: (listItems: ListItem[])=> void;
}

const ListDataContext = createContext<ListDataContextType | undefined>(
  undefined
);

const ListDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ListItem[]>([]);

  const addItem = (item: ListItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const addListItems = (listItems: ListItem[])=>{
    setItems((prevItems) => [...prevItems, ...listItems]);
  }

  const updateItem = (id: string, updatedItem: Partial<ListItem>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getItemsByType = (type: string) => {
    return items.filter((item) => item.type === type);
  };
  const getItemById = (id: string) => {
    return items.find((item) => item.id === id);
  };
  return (
    <ListDataContext.Provider
      value={{ items, addItem, updateItem, deleteItem, getItemsByType, addListItems,getItemById }}
    >
      {children}
    </ListDataContext.Provider>
  );
};

const useListData = () => {
  const context = useContext(ListDataContext);
  if (context === undefined) {
    throw new Error("useListData must be used within a ListDataProvider");
  }
  return context;
};

export { ListDataProvider, useListData };
