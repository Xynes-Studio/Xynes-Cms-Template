"use client";

import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/storage";

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

  if (!decryptedUser && window.location.pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
