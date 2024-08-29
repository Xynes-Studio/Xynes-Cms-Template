"use client";
import { Card, Flex, LmCkDelete } from "lumia-ui";
import styles from "./page.module.css";
import { useModal } from "@/context/modals/modalProvider";
import { useCallback, useEffect } from "react";
import ApiService from "@/services/apiService";
import { BASE_URL } from "@/config/config";
import {
  Notification,
  useNotifications,
} from "@/context/notifications/notificationsProvider";
import { UserResponse } from "../(login)/login/login.client";
import { ListItem } from "@/context/listData/list.model";
import { useListData } from "@/context/listData/listDataProvider";
import { getFromLocalStorage } from "@/utils/storage";
import { useUser } from "@/context/user/userContext";

interface User {
  active: boolean;
  approved: boolean;
  avatar: string;
  created_at: string; // Consider using `Date` if you'll be converting to date objects
  email: string;
  id: string;
  name: string;
  passwd: string; // Typically you wouldn't include passwords in client-side types
  username: string;
}

interface DataEntry {
  active: boolean;
  category: string;
  created_at: string;
  created_by: string;
  des: string;
  id: string;
  keywords: string;
  thumbnail: string;
  title: string;
  updated_at: string;
  user: User;
}

interface BlogApiResponse {
  data: DataEntry[];
  number_of_pages: number;
  page_num: number;
  page_size: number;
  total_elements: number;
}

export interface BlogEntry {
  active: boolean;
  category: string;
  created_at: string; // ISO 8601 date string, consider using `Date` if you'll parse this to a Date object
  created_by: string; // UUID format
  des: string;
  keywords: string;
  thumbnail: string;
  title: string;
  updated_at: string; // ISO 8601 date string, consider using `Date` if you'll parse this to a Date object
}

const Blog = () => {
  const apiService = new ApiService(BASE_URL);
  const { alert } = useNotifications();
  const { addListItems, getItemsByType, updateItem,deleteItem } = useListData();
  const blogs = getItemsByType("blog");
  const { getUser } = useUser();
  const handleFetch = useCallback(async () => {
    try {
      const resp = await apiService.get<BlogApiResponse>(`/blogs`);
      if (resp && resp.data && resp.data.length > 0) {
        let listItems: ListItem[] = resp.data.map((blog: DataEntry) => {
          return {
            id: blog.id,
            type: "blog", // assuming "type" is a constant value like "blog" or derive it based on data
            title: blog.title,
            description: blog.des, // assuming "des" is the description
            image: blog.thumbnail,
            active: blog.active,
            author: {
              name: blog.user.name,
              avatar: blog.user.avatar,
              description: blog.user.email, // You can choose another field for description if more suitable
            },
          };
        });
        addListItems(listItems);
      }
    } catch (error: any) {
      const newNotification: Notification = {
        title: "Login failed",
        description: error.message,
        status: "error",
      };
      alert(newNotification);
    }
  }, []);

  useEffect(() => {
    console.log("use effect");
    if (blogs.length == 0) handleFetch();
  }, [handleFetch]);

  const { showModal, hideModal } = useModal();
  const handleDeleteButton = (id: string) => {
    showModal({
      title: "Delete Confirmation",
      description: "Are you sure you want to delete this item?",
      primaryBtnText: "Delete",
      secondaryBtnText: "Cancel",
      primaryBtnFeedback: async () => {
        try {
          const user = await getUser();
          const resp = await apiService.delete<any>(`/users/blogs/${id}`, {
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

        hideModal();
      },
      secondaryBtnFeedback: () => {
        hideModal();
      },
    });
  };
  const handleToggleButton = async (id: string, active: boolean) => {
    try {
      const user = await getUser();
      const resp = await apiService.put<BlogEntry>(
        `/users/blogs/${id}`,
        {
          active: !active,
        },
        {
          Authorization: `Bearer ${user?.token}`,
        }
      );
      if (resp) {
        updateItem(id, { active: resp.active });
        const newNotification: Notification = {
          title: `${active ? "Unpublished" : "Published"} Successfully`,
          description: `The Blog has been ${active ? "Unpublished" : "Published"} successfully`,
          status: "success",
        };
        alert(newNotification);
      }
    } catch (error: any) {
      updateItem(id, { active });
      const newNotification: Notification = {
        title: "Toggle Failed",
        description: error.message,
        status: "error",
      };
      alert(newNotification);
    }
  };
  return (
    <div className={styles.wrapper}>
      <Flex wrap direction="row" responsive className={styles.container}>
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            actionElement={
              <button onClick={() => handleDeleteButton(blog.id)}>
                <LmCkDelete className={styles.deleteBtn} color="white" />
              </button>
            }
            displaySwitch
            image={blog.image || "https://picsum.photos/id/1/400/450"}
            type="fill"
            toggleValue={blog.active}
            onToggle={() => handleToggleButton(blog.id, blog.active)}
            title={blog.title}
            description={blog.description || ""}
          ></Card>
        ))}
      </Flex>
    </div>
  );
};

export default Blog;
