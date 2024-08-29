import { Button, Flex, LmCkCheck, Text, TextInput } from "lumia-ui";
import styles from "./youtubeDetails.module.css";
import { useEditor } from "@/context/editor/editorProvider";
import { useState } from "react";
import { BlogRenderItem } from "@/context/editor/editor.type";
import { useNotifications } from "@/context/notifications/notificationsProvider";
import { handleMouseDownChild } from "../textDetails/textDetails";
import YoutubeLinkModal from "../../../../../writingPad/components/youtubeRender/youtubeInput";

const YoutubeDetails = () => {
  const { selectedItem, items, updateItem, updateSelectedItem } = useEditor();
  const item = items.filter((i: BlogRenderItem) => i.id === selectedItem)[0];
  const [link, setLink] = useState<string>(item.val);
  const [valid, setValid] = useState(true);
  const { alert } = useNotifications();

  const youtubeLink = (...args: unknown[]) => {
    const value = args[0] as string;
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (value && !regex.test(value)) {
      setValid(false);
      throw new Error("is not a valid YouTube link.");
    }
  };

  const handleClick = () => {
    if (!link) {
      alert({
        title: "Enter a valid link.",
        status: "error",
      });
      return;
    }
    if (!valid) {
      alert({
        title: "Link is not an valid youtube url.",
        status: "error",
      });
      return;
    }
    updateItem(item.id, { val: link });
    updateSelectedItem(item.id);
  };

  return (
    <Flex
      onClick={handleMouseDownChild}
      direction="column"
      className={styles.container}
    >
      <Text className={styles.caption} type="caption">
        Youtube Details:
      </Text>
      <Flex className={styles.linkArea}>
        <YoutubeLinkModal
          link={link}
          setLink={setLink}
          setValid={setValid}
          youtubeLink={youtubeLink}
        />
        <Button
          onClick={handleClick}
          aria-disabled={!valid}
          icon={LmCkCheck}
          backgroundColor="var(--accent100)"
          color="var(--foregroundInverse)"
        />
      </Flex>
    </Flex>
  );
};

export default YoutubeDetails;
