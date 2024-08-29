import React, { createContext, useContext, useState, ReactNode } from "react";
import { ListItem } from "./list.model";
import { renderOBJ } from "@/app/[renderPath]/renderItems/renderItems.types";
import ApiService from "@/services/apiService";
import { BASE_URL } from "@/config/config";
import {
  Notification,
  useNotifications,
} from "../notifications/notificationsProvider";
import { useUser } from "../user/userContext";
import { useNotification } from "lumia-ui";
import { useModal } from "../modals/modalProvider";

interface ListDataContextType {
  items: ListItem[];
  addItem: (item: ListItem) => void;
  updateItem: (id: string, updatedItem: Partial<ListItem>) => void;
  deleteItem: (id: string) => void;
  getItemsByType: (type: string) => ListItem[];
  getItemById: (id: string) => ListItem | undefined;
  addListItems: (listItems: ListItem[]) => void;
  fetchList: (ENDPOINT: string, type: string) => Promise<ListItem[] | null>;
  deleteListApi: (ENDPOINT: string, id: string) => Promise<void>;
  switchListItemApi: (
    ENDPOINT: string,
    id: string,
    status: boolean
  ) => Promise<void>;
}

export interface ListApiResponse {
  data: renderOBJ[];
  number_of_pages: number;
  page_num: number;
  page_size: number;
  total_elements: number;
}

const ListDataContext = createContext<ListDataContextType | undefined>(
  undefined
);

const ListDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ListItem[]>([]);
  const apiService = new ApiService(BASE_URL);

  const { getUser } = useUser();
  const { alert } = useNotifications();

  const addItem = (item: ListItem) => {
    setItems((prevItems) => {
      const itemExists = prevItems.some(
        (existingItem) => existingItem.id === item.id
      );
      return itemExists ? prevItems : [...prevItems, item];
    });
  };

  const addListItems = (listItems: ListItem[]) => {
    setItems((prevItems) => {
      const newItems = listItems.filter(
        (newItem) =>
          !prevItems.some((existingItem) => existingItem.id === newItem.id)
      );
      return [...prevItems, ...newItems];
    });
  };

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

  const fetchList = async (ENDPOINT: string, type: string) => {
    try {
      const resp = await apiService.get<ListApiResponse>(ENDPOINT);

      if (resp && resp.data && resp.data.length > 0) {
        const listItems: ListItem[] = resp.data.map((blog: renderOBJ) => ({
          id: blog.id,
          type: type,
          title: blog.title,
          description: blog.des,
          image: blog.thumbnail,
          active: blog.active,
          author: {
            name: blog.user?.name,
            avatar: blog.user?.avatar,
            description: blog.user?.email,
          },
        }));
        addListItems(listItems);
        return listItems;
      }
    } catch (error: any) {
      const newNotification: Notification = {
        title: "Error fetching list",
        description: error.message,
        status: "error",
      };
      alert(newNotification);
    }
    return null;
  };

  const deleteListApi = async (ENDPOINT: string, id: string) => {
    try {
      const user = await getUser();
      const resp = await apiService.delete<any>(ENDPOINT, {
        Authorization: `Bearer ${user?.token}`,
      });
      if (resp.status) {
        deleteItem(id);
        const newNotification: Notification = {
          title: "Blog Deleted",
          description: "Blog has been deleted",
          status: "success",
        };
        alert(newNotification);
      }
    } catch (error: any) {
      const newNotification: Notification = {
        title: "Delete Failed",
        description: error.message,
        status: "error",
      };
      alert(newNotification);
    }
  };

  const switchListItemApi = async (
    ENDPOINT: string,
    id: string,
    status: boolean
  ) => {
    try {
      const user = await getUser();
      const resp = await apiService.put<renderOBJ>(
        `/users/blogs/${id}`,
        {
          active: status,
        },
        {
          Authorization: `Bearer ${user?.token}`,
        }
      );
      if (resp) {
        updateItem(id, { active: resp.active });
        const newNotification: Notification = {
          title: `${!status ? "Unpublished" : "Published"} Successfully`,
          description: `The Blog has been ${
            !status ? "Unpublished" : "Published"
          } successfully`,
          status: "success",
        };
        alert(newNotification);
      }
    } catch (error: any) {
      updateItem(id, { active: status });
      const newNotification: Notification = {
        title: "Toggle Failed",
        description: error.message,
        status: "error",
      };
      alert(newNotification);
    }
  };

  return (
    <ListDataContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        getItemsByType,
        addListItems,
        getItemById,
        fetchList,
        deleteListApi,
        switchListItemApi,
      }}
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
