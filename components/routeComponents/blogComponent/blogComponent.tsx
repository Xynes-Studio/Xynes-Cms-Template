import { v4 as uuid } from "uuid";
import { FormElementData } from "../formComponent.type";
import { useState } from "react";
import { TabsObj } from "../types/tabsOb.types";
import {
  Button,
  cx,
  Flex,
  LmBuble,
  LmCkArrowUpDown,
  LmCkEdit,
  LmCkSettings,
  Tabs,
} from "lumia-ui";
import { ListItem } from "@/context/listData/list.model";
import styles from "./blogComponent.module.css";
import RenderDetails from "./renderDetails";

const metaEditData: FormElementData[] = [
  {
    type: "textInput",
    key: "title",
    id: uuid(),
    label: "Title",
  },
  {
    type: "textArea",
    key: "description",
    id: uuid(),
    label: "Description",
  },
  {
    type: "textInput",
    key: "tags",
    id: uuid(),
    label: "Tags",
  },
  {
    type: "textInput",
    key: "author",
    id: uuid(),
    label: "Author",
  },
];

export interface BlogModalProps {
  item: ListItem;
}

const BlogModalComponent: React.FC<BlogModalProps> = ({ item }) => {
  const [containerStyles, setContainerStyles] = useState<string>();
  const [selected, setSelected] = useState<"meta" | "comments" | "analytics" | string>("meta");

  const handleClick = (type: "meta" | "comments" | "analytics" | string) => {
    setSelected(type);
    switch (type) {
      case "meta":
        setContainerStyles(styles.meta);
        break;
      case "comments":
        setContainerStyles(styles.comment);
        break;
      case "analytics":
        setContainerStyles(styles.analytics);
        break;

      default:
        setContainerStyles(styles.meta);
        break;
    }
  };
  const tabs: TabsObj[] = [
    {
      label: "Meta",
      type: "meta",
      icon: LmCkSettings,
    },
    {
      label: "Comments",
      type: "comments",
      icon: LmBuble,
    },
    {
      label: "Analytics",
      type: "analytics",
      icon: LmCkArrowUpDown,
    },
  ];

  return (
    <Flex direction="column" className={cx(styles.container, containerStyles)}>
      <Button
        color="var(--foregroundInverse)"
        backgroundColor="var(--accent100)"
        label="Edit Blog"
        icon={LmCkEdit}
        className={styles.editButton}
      />
      {/**Tabs */}
      <div className={styles.tabsContainer}>
        <Flex className={styles.tabs}>
          {tabs.map((i: TabsObj) => {
            return (
              <Tabs
                direction="horizontal"
                key={i.label}
                label={i.label}
                onClick={() => handleClick(i.type)}
                icon={i.icon}
                selected={selected === i.type}
              />
            );
          })}
        </Flex>
      </div>
      {/**Tabs */}
      {/**Details */}
      {/**Details */}
      <RenderDetails item={item} type={selected} />
      {/**Details */}
      {/**Details */}
    </Flex>
  );
};

export default BlogModalComponent;
