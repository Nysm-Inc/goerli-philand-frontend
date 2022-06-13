import { Modal as ChakraModal, ModalBody, ModalContent, ModalHeader } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const Modal: FC<{ title: string; isOpen: boolean; onClose: () => void; children: ReactNode }> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered size="2xl" scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
