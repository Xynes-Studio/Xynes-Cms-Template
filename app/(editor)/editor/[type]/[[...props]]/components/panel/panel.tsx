import { Button, Flex, Tabs, Text } from "lumia-ui";
import styles from "./panel.module.css";
import { PanelTabProperties, useEditor } from "@/context/editor/editorProvider";
import EditorMeta from "./meta/meta";
import Design from "./design/design";

const panelTabs: PanelTabProperties[] = ["Design", "Meta"];

const Panel = () => {
  const { isUpdate, type, selectedTab, setSelectedTab } = useEditor();
  return (
    <Flex direction="column" className={styles.container}>
      <Flex className={styles.header}>
        <Text className={styles.headerTXT}>
          {isUpdate ? "Update" : "Create"}
          {` ${type}`}
        </Text>
        <Button
          label={isUpdate ? "Update" : "Post"}
          color="var(--foregroundInverse)"
          backgroundColor="var(--accent100)"
          title={isUpdate ? "Update" : "Publish"}
        />
      </Flex>
      <Flex className={styles.tabs}>
        {panelTabs.map((i: PanelTabProperties) => {
          return (
            <Tabs
              label={i}
              key={i}
              selected={i === selectedTab}
              selectType="select-200"
              onClick={() => setSelectedTab(i)}
              color={i === selectedTab ? "var(--app)" : "var(--foreground)"}
            />
          );
        })}
      </Flex>
      <Flex direction='column' className={styles.content}>
        {selectedTab === "Meta" && <EditorMeta />}
        {selectedTab === 'Design' && <Design />}
      </Flex>
    </Flex>
  );
};

export default Panel;
