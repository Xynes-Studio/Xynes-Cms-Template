import React from "react";
import styles from "./cardRendered.module.css";
import { renderOBJ } from "../renderItems.types";
import { Card, Flex, LmCkDelete } from "lumia-ui";
import { ListItem } from "@/context/listData/list.model";
import { useModal } from "@/context/modals/modalProvider";
import { useListData } from "@/context/listData/listDataProvider";

export interface CardRendererProps {
  data?: ListItem[];
  switchEndPoint?: string;
  deleteEndPoint?: string;
}

const CardRenderer: React.FC<CardRendererProps> = ({
  data,
  deleteEndPoint,
  switchEndPoint,
}) => {
  const { showModal, hideModal } = useModal();
  const { deleteListApi, switchListItemApi } = useListData();
  const handleDeleteButton = (id: string) => {
    if (deleteEndPoint)
      showModal({
        title: "Delete Confirmation",
        description: "Are you sure you want to delete this item?",
        primaryBtnText: "Delete",
        secondaryBtnText: "Cancel",
        primaryBtnFeedback: async () => {
          deleteListApi(`${deleteEndPoint}${id}`, id);
          hideModal();
        },
        secondaryBtnFeedback: () => {
          hideModal();
        },
      });
  };
  return (
    <Flex wrap direction="row" responsive className={styles.container}>
      {data?.map((item: ListItem) => (
        <Card
          key={item.id}
          className={styles.card}
          actionElement={
            deleteEndPoint ? (
              <button className={styles.deleteBtn} onClick={() => handleDeleteButton(item.id)}>
                <LmCkDelete className={styles.deleteBtn} color="white" />
              </button>
            ) : undefined
          }
          displaySwitch={switchEndPoint ? true : false}
          image={item.image}
          type="fill"
          toggleValue={item.active}
          onToggle={() =>
            switchEndPoint &&
            switchListItemApi(
              `${switchEndPoint}${item.id}`,
              item.id,
              !item.active
            )
          }
          title={item.title}
          description={item.description || ""}
        ></Card>
      ))}
    </Flex>
  );
};

export default CardRenderer;
