"use client";

import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/storage";
import { Flex } from "lumia-ui";
import styles from "./prismLayout.module.css";
import Header from "@/components/header/header";
import LeftPanel from "@/components/leftPannel/LeftPanel";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/load/load";

type ClientOnlyProps = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [decryptedUser, setDecryptedUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== "undefined") {
        try {
          const user = await getFromLocalStorage("user");
          if (user) {
            setDecryptedUser(user);
            if (path === "/login") {
              router.replace("/");
            }
          } else {
            if (path !== "/login") {
              router.replace("/login");
            }
          }
        } catch (error) {
          console.error("Error fetching user from local storage:", error);
          if (path !== "/login") {
            router.replace("/login");
          }
        }
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [path, router]);

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
