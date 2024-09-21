import { cx, Flex } from "lumia-ui";
import styles from "./horizontalModal.module.css";
import { useEffect, useState } from "react";
import { handleMouseDownChild } from "@/app/(editor)/editor/[type]/[[...props]]/components/panel/design/components/elementDetails/textDetails/textDetails";

export interface HorizontalModalProps {
  position: "left" | "right";
  children?: React.ReactNode;
  isVisible: boolean;
  onClose?: () => void;
}

const HorizontalModal: React.FC<HorizontalModalProps> = ({
  position,
  children,
  isVisible = false,
  onClose,
}) => {
  const [show, setShow] = useState(false);
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  useEffect(() => {
    setTimeout(() => {
      setShow(isVisible);
    }, 100);
  }, [isVisible]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose && onClose();
    }, 100);
  };

  if (isVisible) {
    return (
      <Flex
        onScroll={handleScroll}
        direction="column"
        onClick={() => handleClose()}
        className={cx(styles.container, show && styles.show)}
      >
        <Flex
          onClick={handleMouseDownChild}
          className={cx(
            styles.content,
            position === "left" ? styles.left : styles.right,
            show && styles.show
          )}
        >
          {children}
        </Flex>
      </Flex>
    );
  } else {
    return null;
  }
};

export default HorizontalModal;
