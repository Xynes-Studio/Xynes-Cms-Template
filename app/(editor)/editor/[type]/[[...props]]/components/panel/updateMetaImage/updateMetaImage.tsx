/* eslint-disable @next/next/no-img-element */
import { Flex, LMAsset, Text } from "lumia-ui";
import styles from "./updateMetaImage.module.css";
import { useEditor } from "@/context/editor/editorProvider";
import { LmImage } from "@/theme/icons/LmImage";
import { useRef } from "react";
import UpdateImage from "@/components/updateImage/updateImage";

const UpdateMetaImage = () => {
  const { meta, updateMeta } = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);
  const accepted = "jpeg, png, webp, heic";

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
    updateMeta({ thumbnailUrl: url });
  };

  return (
    <>
      <UpdateImage
        source={meta.thumbnailUrl}
        updateSource={(value: string) => updateMeta({ thumbnailUrl: value })}
      />
    </>
  );
};

export default UpdateMetaImage;
