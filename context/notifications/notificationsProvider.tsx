import { createContext, useContext, useState, ReactNode } from "react";
import NotificationStack from "./notificationStack";
import { v4 as uuidv4 } from "uuid";

interface CustomNotificationsProviderProps {
  children: ReactNode;
}

export interface AssetProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export interface Notification {
  id?: string;
  type?: "default" | "flat" | "outlined";
  status?: "success" | "warning" | "error";
  title: string;
  description?: string;
  date?: Date;
  read?: boolean;
  icon?: React.FC<AssetProps>;
  image?: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  newNotifications: Notification[] | null; // Ensure this is nullable
  alert: (item?: Notification) => void;
  readNotification: () => void;
}

const NotificationsContext = createContext<NotificationState>({
  notifications: [],
  unreadCount: 0,
  newNotifications: [],
  alert: () => {},
  readNotification: () => {},
});

export const NotificationsProvider = ({
  children,
}: CustomNotificationsProviderProps) => {
  const [currentNotifications, setCurrentNotifications] = useState<
    Notification[]
  >([]);
  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);

  const alert = (item?: Notification) => {
    if (item) {
      setNewNotifications([{ id: uuidv4(), date: new Date(), ...item }, ...newNotifications]);
    } else {
      return null;
    }
  };
  const readNotification = () => {
    setCurrentNotifications([...newNotifications, ...currentNotifications]);
    setNewNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications: currentNotifications,
        newNotifications,
        unreadCount: newNotifications.length,
        alert,
        readNotification,
      }}
    >
      {children}
      <NotificationStack />
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};
