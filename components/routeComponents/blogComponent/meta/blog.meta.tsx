import React, { ChangeEvent, useState } from "react";
import { BlogModalProps } from "../blogComponent";
import Loader from "@/components/load/load";
import { Flex, Text, Textarea, TextInput } from "lumia-ui";
import styles from "./blog.meta.module.css";
import UpdateMetaImage from "@/app/(editor)/editor/[type]/[[...props]]/components/panel/updateMetaImage/updateMetaImage";
import { Gap } from "@/app/(editor)/editor/[type]/[[...props]]/components/panel/meta/meta";
import { Meta } from "@/context/editor/editor.type";
import moment from "moment";
import UpdateImage from "@/components/updateImage/updateImage";

const BlogMeta: React.FC<BlogModalProps> = ({ item }) => {
  const [meta, setMeta] = useState<Meta>({
    title: "",
    author: "",
    datePublished: moment().format("YYYY MM DD"),
    tags: "",
    description: "",
    thumbnailUrl: "/image.webp",
    lastModified: moment().format("YYYY MM DD"),
  });
  const [loading, setLoading] = useState(false);

  const updateMeta = (updatedMeta: Partial<Meta>) => {
    setMeta((prevMeta) => ({ ...prevMeta, ...updatedMeta }));
  };

  if (loading) {
    return (
      <Flex className={styles.load}>
        <Loader />
      </Flex>
    );
  }

  return (
    <Flex className={styles.container}>
      <Flex direction="column" className={styles.container}>
        <Text type="caption" style={{ marginBottom: "0.5rem" }}>
          Thumbnail Image:
        </Text>
        <UpdateImage
          source={meta.thumbnailUrl}
          updateSource={(val: string) => updateMeta({ thumbnailUrl: val })}
        />
        <Gap />
        <TextInput
          label="Title:"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateMeta({ title: event.target.value })
          }
          value={meta.title}
          placeholder="Enter title"
          className={styles.input}
        />
        <Gap />
        <TextInput
          label="Tags:"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateMeta({ tags: event.target.value })
          }
          value={meta.tags}
          placeholder="Enter tags separated by ','"
          title="Enter tags separated by ','"
          className={styles.input}
        />
        <Gap />
        <Textarea
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            updateMeta({ description: event.target.value })
          }
          label="Descriptions:"
          value={meta.description}
          placeholder="Enter description."
          className={styles.input}
        />
        <Gap />
        <TextInput
          label="Author Name:"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateMeta({ author: event.target.value })
          }
          value={meta.author}
          placeholder="Author name"
          title="Author name"
          className={styles.input}
        />
        <Gap />
      </Flex>
    </Flex>
  );
};

export default BlogMeta;
