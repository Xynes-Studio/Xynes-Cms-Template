import { Flex, Image, Text, Textarea, TextInput } from "lumia-ui";
import styles from "./meta.module.css";
import { useEditor } from "@/context/editor/editorProvider";
import UpdateMetaImage from "../updateMetaImage/updateMetaImage";
import { ChangeEvent } from "react";
import styled from "styled-components";
const Gap = styled.div`
  height: 1rem;
`;

const EditorMeta = () => {
  const { meta, updateMeta } = useEditor();
  return (
    <Flex direction="column" className={styles.container}>
      <Text type="caption" style={{ marginBottom: "0.5rem" }}>
        Thumbnail Image:
      </Text>
      <UpdateMetaImage />
      <Gap/>
      <TextInput
        label="Title:"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          updateMeta({ title: event.target.value })
        }
        value={meta.title}
        placeholder="Enter title"
        className={styles.input}
      />
      <Gap/>
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
      <Gap/>
      <Textarea
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          updateMeta({ description: event.target.value })
        }
        label="Descriptions:"
        value={meta.description}
        placeholder="Enter description."
        className={styles.input}
      />
      <Gap/>
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
      <Gap/>
    </Flex>
  );
};

export default EditorMeta;
