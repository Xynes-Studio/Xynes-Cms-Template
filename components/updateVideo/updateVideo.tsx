/* eslint-disable @next/next/no-img-element */
import { cx, Flex, LMAsset, Text } from "lumia-ui";
import styles from "./updateVideo.module.css";
import { LmImage } from "@/theme/icons/LmImage";
import { useRef } from "react";

const UpdateVideo: React.FC<{
  source?: string;
  updateSource: (value: string) => void;
  className?: string
}> = ({ source, updateSource, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const accepted = "mp4, webm, mkv";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      throw new Error("No file selected.");
    }

    console.log("fileObj is", fileObj);
    const ext = fileObj.type.split("/")[1];

    if (accepted !== undefined) {
      const supported = accepted.split(",").map((e) => e.trim());

      if (supported.filter((i) => i === ext).length === 0) {
        throw new Error("Format not supported.");
      }
    }

    // Reset file input
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Create object URL for preview
    const url = URL.createObjectURL(fileObj);

    // Call onUpdate callback with URL and file object
    updateSource(url);
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
      <Flex className={cx(styles.container, className)}>
        <img
          alt="Meta Image"
          src={source || "/image.webp"}
          className={styles.img}
        />
        <button
          onClick={() => inputRef.current?.click()}
          className={styles.overlayButton}
        >
          <Flex direction="column" className={styles.overlay}>
            <LMAsset Asset={LmImage} size={0.7} />
            <Text className={styles.text} color="var(--foregroundInverse)">
              Update Video
            </Text>
          </Flex>
        </button>
      </Flex>
    </>
  );
};

export default UpdateVideo;
