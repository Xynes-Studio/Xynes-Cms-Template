import HorizontalModal from "@/components/modals/horizontalModals";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";

interface HorizontalModalOptions {
  content?: ReactElement | null;
  position?: "left" | "right";
  onClose?: () => void;
}

interface HorizontalModalContextType {
  isVisible: boolean;
  showHorizontalModal: (options: HorizontalModalOptions) => void;
  hideHorizontalModal: () => void;
}

const HorizontalModalContext = createContext<HorizontalModalContextType | undefined>(undefined);

export const useHorizontalModal = (): HorizontalModalContextType => {
  const context = useContext(HorizontalModalContext);
  if (!context) {
    throw new Error("useHorizontalModal must be used within a HorizontalModalProvider");
  }
  return context;
};

export const HorizontalModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("right");
  const [content, setContent] = useState<ReactNode | null>(null);
  const [onClose, setOnClose] = useState<(() => void) | undefined>(undefined); 

  const hideHorizontalModal = () => {
    setIsVisible(false);
    setContent(null);
    if (onClose) onClose(); 
  };

  const showHorizontalModal = ({
    content = null,
    position = "right",
    onClose,
  }: HorizontalModalOptions) => {
    setContent(content);
    setPosition(position);
    setOnClose(() => onClose); 
    setIsVisible(true);
  };

  return (
    <HorizontalModalContext.Provider
      value={{
        isVisible,
        showHorizontalModal,
        hideHorizontalModal,
      }}
    >
      {children}
      {isVisible && (
        <HorizontalModal isVisible={isVisible} onClose={hideHorizontalModal} position={position}>
          {content}
        </HorizontalModal>
      )}
    </HorizontalModalContext.Provider>
  );
};
