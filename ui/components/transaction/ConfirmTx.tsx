import { FC } from "react";
import { Center, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { Tx } from "~/types/wagmi";

const ConfirmTx: FC<{ txs: Tx[] }> = ({ txs }) => {
  return (
    <Modal isOpen={txs.some((tx) => tx.tmpStatus === "loading")} onClose={() => {}} isCentered closeOnOverlayClick>
      <ModalOverlay />
      <ModalContent
        border="2px solid"
        borderColor="black"
        borderRadius="none"
        minW="480px"
        minH="480px"
        maxW="480px"
        maxH="480px"
      >
        <ModalHeader>=======================================</ModalHeader>
        <ModalBody w="full" h="full">
          <Center w="full" h="full">
            <VStack>
              <Text>WAITING FOR</Text>
              <Text>CONFIRMATION</Text>
            </VStack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmTx;
