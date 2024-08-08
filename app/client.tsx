"use client";

import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/storage";
import { Flex } from "lumia-ui";
import styles from "./prismLayout.module.css";
import NavigationStack from "./navigation/navigation";
import Header from "@/components/header/header";
import LeftPanel from "@/components/leftPannel/LeftPanel";

type ClientOnlyProps = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [decryptedUser, setDecryptedUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== "undefined") {
        try {
          const user = await getFromLocalStorage("user");
          if (user) {
            setDecryptedUser(user);
            console.log("Decrypted user:", user);
          } else {
            if (window.location.pathname !== "/login") {
              window.location.replace("/login");
            }
          }
        } catch (error) {
          console.error("Error fetching user from local storage:", error);
          if (window.location.pathname !== "/login") {
            window.location.replace("/login");
          }
        }
      }
    };

    fetchUser();
  }, []);

  if (!decryptedUser) {
    return null;
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
