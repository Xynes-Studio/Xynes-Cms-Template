import { Alert, Flex } from "lumia-ui";
import styles from "./notifications.module.css";
import { Notification, useNotifications } from "./notificationsProvider";
import { useEffect, useState, useCallback } from "react";

const NotificationStack = () => {
  const { newNotifications } = useNotifications();
  const [alertStack, setAlertStack] = useState<Notification[]>([]);

  const addNotificationToStack = useCallback(() => {
    if (newNotifications && newNotifications[0]?.id) {
      setAlertStack(prevStack => [newNotifications[0], ...prevStack]);
      setTimeout(() => {
        setAlertStack(prevStack =>
          prevStack.filter(
            (notification: Notification) => notification.id !== newNotifications[0].id
          )
        );
      }, 3000);
    }
  }, [newNotifications]);

  useEffect(() => {
    addNotificationToStack();
  }, [addNotificationToStack]);

  return (
    <Flex direction="column" className={styles.container}>
      {alertStack.map((item: Notification) => (
        <Alert key={item.id} {...item} />
      ))}
    </Flex>
  );
};

export default NotificationStack;
