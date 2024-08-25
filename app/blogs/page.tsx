"use client";
import { Card, Flex, LmCkDelete } from "lumia-ui";
import styles from "./page.module.css";
import { useModal } from "@/context/modals/modalProvider";
const Blog = () => {
  const { showModal } = useModal();
  const handleOpenModal = () => {
    console.log("calling");
    
    showModal({
      title: "Delete Confirmation",
      description: "Are you sure you want to delete this item?",
      primaryBtnText: "Delete",
      secondaryBtnText: "Cancel",
      primaryBtnFeedback: () => {
        alert("Item Deleted");
        // Add your delete logic here
      },
      secondaryBtnFeedback: () => {
        alert("Deletion Canceled");
      },
    });
  };
  return (
    <div className={styles.wrapper}>
      <Flex wrap direction="row" responsive className={styles.container}>
        <Card
          actionElement={
            <button onClick={handleOpenModal}>
              <LmCkDelete className={styles.deleteBtn} color="white" />
            </button>
          }
          displaySwitch
          image="https://picsum.photos/id/1/400/450"
          type="fill"
          title="Test blog,this a blog card this a blog card this a blog card this a blog card this a blog card "
          description="this a blog card , The quick brown fox jumps over a lazy dog is the most famous pangram in English, "
        ></Card>
        <Card
          actionElement={
            <LmCkDelete className={styles.deleteBtn} color="white" />
          }
          displaySwitch
          image="https://picsum.photos/id/2/400/450"
          type="fill"
          title="Test blog"
          description="this a blog card , The quick brown fox jumps over a lazy dog is the most famous pangram in English, "
        ></Card>
        <Card
          actionElement={
            <LmCkDelete className={styles.deleteBtn} color="white" />
          }
          displaySwitch
          image="https://picsum.photos/id/3/400/450"
          type="fill"
          title="Test blog"
          description="this a blog card , The quick brown fox jumps over a lazy dog is the most famous pangram in English, "
        ></Card>
      </Flex>
    </div>
  );
};

export default Blog;
