"use client";
import { Button, LmCkAdd, SearchInput } from "lumia-ui";
import styles from "./header.module.css";
import { routes, RouteTypes } from "@/app/navigation/route";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const path = usePathname();
  const route = useRouter();
  const item = routes.filter((i: RouteTypes) => i.link === path)[0];
  return (
    <header className={styles.head}>
      <SearchInput
        className={styles.search}
        type="outline"
        placeholder="Search here..."
      />
      {item && item.canAddBlog && (
        <Button
          onClick={() => {
            route.push(`/editor/${path}/create`);
          }}
          icon={LmCkAdd}
          className={styles.Button}
          label={item.title}
        />
      )}
    </header>
  );
};

export default Header;
