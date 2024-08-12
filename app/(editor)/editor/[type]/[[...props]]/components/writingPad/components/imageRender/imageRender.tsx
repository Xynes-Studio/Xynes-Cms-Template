/* eslint-disable @next/next/no-img-element */
import { useEditor } from "@/context/editor/editorProvider";
import styles from "./imageRender.module.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { cx, Flex, LMAsset, Text } from "lumia-ui";
import { LmImage } from "@/theme/icons/LmImage";
import { BlogRenderItem } from "@/context/editor/editor.type";
import {
  Notification,
  useNotifications,
} from "@/context/notifications/notificationsProvider";

interface ImageEditorProps {
  item: BlogRenderItem;
}

export interface ImageItem {
  src: string;
  type: "small" | "banner" | "fill";
}

const ImageEditor: React.FC<ImageEditorProps> = ({ item }) => {
  const { updateItem, deleteItem, editingEnabled, items } = useEditor();
  const { alert } = useNotifications();
  const inputRef = useRef<HTMLInputElement>(null);
  const accepted = "jpeg, png, webp, heic";
  const [imageItem, setImageItem] = useState<ImageItem | null>(
    item.val.length > 0 ? JSON.parse(item.val) : null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const initialRender = useRef(true); // Track initial render

  const handleError = useCallback(
    (title: string, description: string) => {
      console.log(imageItem, item.val.length, "handleError");

      if (!imageItem && item.val.length === 0) {
        const newNotification: Notification = {
          title: title,
          description: description,
          status: "warning",
        };
        alert(newNotification);
        deleteItem(item.id);
      }
      setLoading(false);
    },
    [alert, deleteItem, imageItem, item.id, item.val.length]
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false; // Mark as done after the first render
      return;
    }
    console.log(imageItem, item.val.length, loading, "dasdas");

    if (!imageItem && item.val.length === 0) {
      if (!loading && items[items.length-1].type === 'image') {
        inputRef.current?.click();
      } 
    }
  }, [handleError, imageItem, item.val, loading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];

    // If the fileObj is null or undefined, the user likely canceled the selection
    if (!fileObj) {
      handleError("No File Selected", "Image selection was canceled.");
      setLoading(false); // Ensure loading state is reset
      return;
    }

    setLoading(true);

    const ext = fileObj.type.split("/")[1];

    if (accepted !== undefined) {
      const supported = accepted.split(",").map((e) => e.trim());

      if (supported.filter((i) => i === ext).length === 0) {
        handleError(
          "File format not supported",
          `Following formats are supported ${accepted}.`
        );
        setLoading(false); // Ensure loading state is reset
        return;
      }
    }

    // Reset file input
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Create object URL for preview
    const url = URL.createObjectURL(fileObj);

    const updatedItem: ImageItem = imageItem
      ? {
          ...imageItem,
          src: url,
        }
      : {
          src: url,
          type: "small",
        };

    setImageItem(updatedItem);
    setLoading(false);
    updateItem(item.id, { val: JSON.stringify(updatedItem) });
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={inputRef}
        accept={accepted}
      />
      <Flex
        className={cx(
          styles.container,
          imageItem?.type === "small" && styles.small,
          imageItem?.type === "banner" && styles.banner
        )}
      >
        <img
          alt="Meta Image"
          src={imageItem?.src ? imageItem.src : "/image.webp"}
          className={cx(styles.img) }
        />
        {editingEnabled && (
          <button
            onDoubleClick={() => inputRef.current?.click()}
            className={styles.overlayButton}
          >
            <Flex direction="column" className={styles.overlay}>
              <LMAsset Asset={LmImage} size={0.7} />
              <Text className={styles.text} color="var(--foregroundInverse)">
                Update Image
              </Text>
            </Flex>
          </button>
        )}
      </Flex>
    </>
  );
};

export default ImageEditor;
