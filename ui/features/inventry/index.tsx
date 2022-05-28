import { FC } from "react";
import { Modal, ModalContent } from "@chakra-ui/react";

const Inventry: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none">
        <>Inventory</>
      </ModalContent>
    </Modal>
  );
};

export default Inventry;
