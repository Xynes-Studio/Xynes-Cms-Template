import React from "react";
import styles from "./cardRendered.module.css";
import { renderOBJ } from "../renderItems.types";
import { Card, Flex, LmCkDelete } from "lumia-ui";
import { ListItem } from "@/context/listData/list.model";
import { useModal } from "@/context/modals/modalProvider";
import { useListData } from "@/context/listData/listDataProvider";
import { useHorizontalModal } from "@/context/modals/horizontalModalProvider";

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
  const { showHorizontalModal, hideHorizontalModal } = useHorizontalModal();
  const { deleteListApi, switchListItemApi, selectedRouterObj } = useListData();

  const handleDeleteButton = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
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

  const handleCardClick = (item: ListItem) => {
    if (selectedRouterObj?.action?.actionComponent) {
      const ModalComponent = selectedRouterObj?.action?.actionComponent;

      switch (selectedRouterObj?.action?.type) {
        case "open-modal-right":
          showHorizontalModal({ content: <ModalComponent item={item} /> });
          break;

        default:
          break;
      }
    }
  };

  return (
    <Flex wrap direction="row" responsive className={styles.container}>
      {data?.map((item: ListItem) => (
        <a key={item.id} className={styles.anchor}>
          <Card
            className={styles.card}
            onClick={() => handleCardClick(item)}
            actionElement={
              deleteEndPoint ? (
                <button
                  className={styles.deleteBtn}
                  onClick={(event) => handleDeleteButton(event, item.id)}
                >
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
        </a>
      ))}
    </Flex>
  );
};

export default CardRenderer;
