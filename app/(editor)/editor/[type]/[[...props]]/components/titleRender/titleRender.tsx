import { useEffect, useRef, useState } from "react";
import styles from "./titleRender.module.css";
import { useEditor } from "@/context/editor/editorProvider";

const TitleRender = () => {
  const { meta, updateMeta } = useEditor();
  const text = meta.title;
  const maxLength = 100;
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
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      className={styles.textarea}
      rows={1}
      placeholder="Write a title..."
      maxLength={maxLength}
    />
  );
};

export default TitleRender;
