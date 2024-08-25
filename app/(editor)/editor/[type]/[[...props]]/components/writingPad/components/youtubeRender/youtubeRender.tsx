import React, { ChangeEvent, useEffect, useState } from "react";
import { BlogRenderItem } from "@/context/editor/editor.type";
import { cx, Flex, Text, TextInput } from "lumia-ui";
import styles from "./youtubeRender.module.css";
import Loader from "@/components/load/load";
import { useModal } from "@/context/modals/modalProvider";
import { useEditor } from "@/context/editor/editorProvider";
import { useNotifications } from "@/context/notifications/notificationsProvider";
import YoutubeLinkModal from "./youtubeInput";

interface YoutubeEditorProps {
  item: BlogRenderItem;
}

export const getYouTubeId = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const YoutubeRender: React.FC<YoutubeEditorProps> = ({ item }) => {
  const [link, setLink] = useState<string>("");
  const { showModal, hideModal } = useModal();
  const { deleteItem, updateItem, updateSelectedItem, selectedItem } =
    useEditor();
  const { alert } = useNotifications();

  const [valid, setValid] = useState(true);

  const youtubeLink = (...args: unknown[]) => {
    const value = args[0] as string;
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (value && !regex.test(value)) {
      setValid(false);
      throw new Error("is not a valid YouTube link.");
    }
  };
  const handleConfirm = () => {
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
    const youtubeID = getYouTubeId(link);
    if (!youtubeID) {
      alert({
        title: "Failed to generate ID.",
        status: "error",
      });
      return;
    }
    updateItem(item.id, { val: youtubeID });
    updateSelectedItem(item.id);
    hideModal();
  };

  const handleCancel = () => {
    if (item.val.length === 0) {
      updateSelectedItem(null);
      deleteItem(item.id);
    }
    hideModal();
  };

  useEffect(() => {
    if (item.val.length === 0) {
      showModal({
        content: (
          <YoutubeLinkModal
            link={link}
            setLink={setLink}
            youtubeLink={youtubeLink}
            setValid={setValid}
          />
        ),
        title: "Paste your youtube link.",
        primaryBtnFeedback: handleConfirm,
        secondaryBtnFeedback: handleCancel,
      });
    } else {
      hideModal();
    }
  }, [item, link, valid, showModal, hideModal, handleConfirm, handleCancel]);

  if (item.val.length === 0) {
    return (
      <Flex className={cx(styles.container, styles.empty)}>
        <Loader />
        <Text>No Youtube Video Available.</Text>
      </Flex>
    );
  }
  return (
    <Flex className={styles.container}>
      <iframe
        src={`https://www.youtube.com/embed/${item?.val}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
        title="Embedded Youtube"
        className={cx(styles.iframe, selectedItem === item.id && styles.selected)}
        style={{
          outline: "none",
        }}
      />
    </Flex>
  );
};

export default YoutubeRender;
