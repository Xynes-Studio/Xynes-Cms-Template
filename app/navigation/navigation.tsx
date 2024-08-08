"use client";
import { cx, Flex, LMAsset, Text } from "lumia-ui";
import { routes, RouteTypes } from "./route";
import Link from "next/link";
import styles from "./navigation.module.css";
import { useEffect } from "react";

const NavigationStack = () => {
  return (
    <Flex className={styles.container} direction="column">
      {routes.map((item: RouteTypes) => {
        return (
          <Link title={item.title} className={styles.link} href={item.link} key={item.link}>
            <Flex className={styles.flex}>
              <div
                className={cx(
                  styles.selected,
                  window?.location?.pathname === item.link && styles.visible
                )}
              ></div>
              {item.icon && <LMAsset Asset={item.icon} size={0.8} />}
              <Text className={styles.title}>{item.title}</Text>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};

export default NavigationStack;
