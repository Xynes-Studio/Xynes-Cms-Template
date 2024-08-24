import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface CustomModalsProviderProps {
  children: ReactNode;
}

export interface AssetProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export interface Modal {
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

export interface ModalState {
  modals: Modal[];
  unreadCount: number;
  newModals: Modal[] | null; // Ensure this is nullable
  alert: (item?: Modal) => void;
  readModal: () => void;
}

const ModalsContext = createContext<ModalState>({
  modals: [],
  unreadCount: 0,
  newModals: [],
  alert: () => {},
  readModal: () => {},
});

export const ModalsProvider = ({
  children,
}: CustomModalsProviderProps) => {
  const [currentModals, setCurrentModals] = useState<
    Modal[]
  >([]);
  const [newModals, setNewModals] = useState<Modal[]>([]);

  const alert = (item?: Modal) => {
    if (item) {
      setNewModals([{ id: uuidv4(), date: new Date(), ...item }, ...newModals]);
    } else {
      return null;
    }
  };
  const readModal = () => {
    setCurrentModals([...newModals, ...currentModals]);
    setNewModals([]);
  };

  return (
    <ModalsContext.Provider
      value={{
        modals: currentModals,
        newModals,
        unreadCount: newModals.length,
        alert,
        readModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export const useModals = () => {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error(
      "useModals must be used within a ModalsProvider"
    );
  }
  return context;
};
