"use client";
import { Button, cx, email, Flex, password, TextInput } from "lumia-ui";
import React, { useState } from "react";
import styles from "./login.module.css";
import ApiService from "@/services/apiService";
import {
  Notification,
  useNotifications,
} from "@/context/notifications/notificationsProvider";
import Loader from "@/components/load/load";
import { saveToLocalStorage } from "@/utils/storage";
import { usePathname, useRouter } from "next/navigation";
import { BASE_URL } from "@/config/config";
import { useUser } from "@/context/user/userContext";

export interface UserResponse {
  active: boolean;
  approved: boolean;
  avatar: string;
  created_at: string; // ISO 8601 formatted date string
  email: string;
  id: string; // UUID or unique identifier
  msg: string;
  name: string;
  passwd: string;
  status: boolean;
  token: string;
  username: string;
}

const LogInClient: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const { alert } = useNotifications();
  const apiService = new ApiService(BASE_URL);
  const { addUser } = useUser();
  const handleLogIn = async () => {
    setLoading(true);
    try {
      apiService.abort();

      const response = await apiService.post<UserResponse>("/users/login", {
        passwd: userPassword,
        username: userEmail,
      });
      await addUser(response);
      if (path === "/login") {
        window.location.replace("/");
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        const newNotification: Notification = {
          title: "Login failed",
          description: "Login request was aborted!",
          status: "warning",
        };
        alert(newNotification);
      } else {
        const newNotification: Notification = {
          title: "Login failed",
          description: "Either username or password was wrong.",
          status: "error",
        };
        alert(newNotification);
      }
    }
    setLoading(false);
  };

  return (
    <Flex className={cx(styles.container)}>
      <Flex direction="column" className={cx(styles.content)}>
        <div className={styles.input}>
          <TextInput
            type="outline-only"
            className={styles.inputInside}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            validations={[email]}
            label="Email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className={styles.input}>
          <TextInput
            type="outline-only"
            inputType="password"
            value={userPassword}
            className={styles.inputInside}
            onChange={(e) => setUserPassword(e.target.value)}
            validations={[password.moderate]}
            label="Password"
            placeholder="Enter Your Password"
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Button
            className={styles.button}
            label="Log In"
            onClick={() => {
              // Handle login logic here
              handleLogIn();
              console.log("Email:", userEmail);
              console.log("Password:", userPassword);
            }}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default LogInClient;
