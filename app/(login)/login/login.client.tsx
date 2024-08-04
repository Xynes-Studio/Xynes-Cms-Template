"use client";
import { Button, cx, email, Flex, password, TextInput } from "lumia-ui";
import React, { useState } from "react";
import styles from "./login.module.css";
import ApiService from "@/services/apiService";
import {
  Notification,
  useNotifications,
} from "@/context/notifications/notificationsProvider";

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
  const { alert } = useNotifications();
  const apiService = new ApiService(
    process.env.HOST || "https://blog.xynes.com/api"
  );

  const handleLogIn = async () => {
    try {
      apiService.abort();

      const response = await apiService.post<UserResponse>("/users/login", {
        passwd: userPassword,
        username: userEmail,
      });

      console.log("User:", response);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.warn("Login request was aborted");
        const newNotification: Notification = {
          title: "Login failed",
          description: "Login request was aborted!",
          status: "warning",
        };
        alert(newNotification);
      } else {
        console.error("Error during login:", error);
        const newNotification: Notification = {
          title: "Login failed",
          description: "Either username or password was wrong.",
          status: "error",
        };
        alert(newNotification);
      }
    }
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
            label="Enter your Email."
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
            label="Enter your password."
          />
        </div>

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
      </Flex>
    </Flex>
  );
};

export default LogInClient;
