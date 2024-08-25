import { Modal } from "lumia-ui";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ModalOptions {
  content?: ReactNode;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  primaryBtnFeedback?: () => void;
  secondaryBtnFeedback?: () => void;
  title?: string;
  description?: string;
}

interface ModalContextType {
  isVisible: boolean;
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const hideModal = () => {
    setIsVisible(false);
    setContent(null);
    setPrimaryBtnText("Confirm");
    setSecondaryBtnText("Cancel");
    setPrimaryBtnFeedback(() => hideModal);
    setSecondaryBtnFeedback(() => hideModal);
    setTitle(undefined);
    setDescription(undefined);
  };
  const [primaryBtnFeedback, setPrimaryBtnFeedback] = useState<
    () => void | undefined
  >(() => hideModal);
  const [secondaryBtnFeedback, setSecondaryBtnFeedback] = useState<
    () => void | undefined
  >(() => hideModal);
  const [primaryBtnText, setPrimaryBtnText] = useState<string>("Confirm");
  const [secondaryBtnText, setSecondaryBtnText] = useState<string>("Cancel");
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const showModal = ({
    content = null,
    primaryBtnText = "Confirm",
    secondaryBtnText = "Cancel",
    primaryBtnFeedback = hideModal,
    secondaryBtnFeedback = hideModal,
    title,
    description,
  }: ModalOptions) => {
    console.log("calling inside");

    setContent(content);
    setPrimaryBtnText(primaryBtnText);
    setSecondaryBtnText(secondaryBtnText);
    setPrimaryBtnFeedback(() => primaryBtnFeedback);
    setSecondaryBtnFeedback(() => secondaryBtnFeedback);
    setTitle(title);
    setDescription(description);
    setIsVisible(true);
  };

  useEffect(() => {
    console.log(isVisible, "isVisible");
  }, [isVisible]);
  return (
    <ModalContext.Provider
      value={{
        isVisible,
        showModal,
        hideModal,
      }}
    >
      {children}
      <Modal
        visible={isVisible}
        onClose={hideModal}
        closeIcon
        primaryBtnOnPress={primaryBtnFeedback}
        secondaryBtnOnPress={secondaryBtnFeedback}
        primaryBtnLabel={primaryBtnText}
        secondaryBtnLabel={secondaryBtnText}
        actionBtnType='both'
        actionBtnAlign='right'
        title={title}
        description={description}
      >
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};
