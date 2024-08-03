"use client";

import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/storage";

type ClientOnlyProps = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [decryptedUser, setDecryptedUser] = useState<string | null>(null);

  useEffect(() => {
    // Ensure this code runs only on the client
    if (typeof window !== "undefined") {
      const user = getFromLocalStorage("user");
      if (user) {
        setDecryptedUser(user);
        console.log("Decrypted user:", user);
      } else {
        if (window.location.pathname !== "/login") {
          window.location.replace("/login"); 
        }
      }
    }
  }, []);

  if (!decryptedUser && window.location.pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
