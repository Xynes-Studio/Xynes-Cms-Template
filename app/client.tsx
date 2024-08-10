"use client";

import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/storage";
import { Flex } from "lumia-ui";
import styles from "./prismLayout.module.css";
import Header from "@/components/header/header";
import LeftPanel from "@/components/leftPannel/LeftPanel";
import Loader from "@/components/load/load";

type ClientOnlyProps = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [decryptedUser, setDecryptedUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== "undefined") {
        try {
          const user = await getFromLocalStorage("user");
          if (user) {
            setDecryptedUser(user);
            if (window.location.pathname === "/login") {
              window.location.replace("/");
            }
          } else {
            if (window.location.pathname  !== "/login") {
              window.location.replace("/login");
            }
          }
        } catch (error) {
          console.error("Error fetching user from local storage:", error);
          if (window.location.pathname  !== "/login") {
            window.location.replace("/login");
          }
        }
      }

      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!decryptedUser) {
    return <>{children}</>;
  }

  return (
    <Flex className={styles.container}>
      <LeftPanel />
      <Flex direction="column" className={styles.right}>
        <Flex className={styles.head}>
          <Header />
        </Flex>
        <Flex className={styles.body}>{children}</Flex>
      </Flex>
    </Flex>
  );
};

export default ClientOnly;
