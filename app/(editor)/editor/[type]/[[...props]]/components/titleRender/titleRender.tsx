import { useEffect, useRef, useState } from "react";
import styles from "./titleRender.module.css";
import { useEditor } from "@/context/editor/editorProvider";

const TitleRender = () => {
  const { meta, updateMeta, editingEnabled } = useEditor();
  const text = meta.title;
  const maxLength = 120;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length < maxLength) {
      updateMeta({ title: value });
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <>
      {editingEnabled ? (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          className={styles.textarea}
          rows={1}
          placeholder="Write a title..."
          maxLength={maxLength}
        />
      ) : (
        <h1 className={styles.textarea}>{text}</h1>
      )}
    </>
  );
};

export default TitleRender;
