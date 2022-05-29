import Image from "next/image";
import { FC } from "react";
import { Box, Center, Modal, ModalBody, ModalContent, ModalHeader, SimpleGrid } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { phiObjectMetadataList } from "~/types/object";

const Quest: FC<{
  isOpen: boolean;
  onClose: () => void;
  onClickItem: (contractAddress: string, tokenId: number) => Promise<void>;
}> = ({ isOpen, onClose, onClickItem }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl" scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none">
        <ModalHeader>Quest</ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {Object.values(phiObjectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
              return (
                <Center
                  key={i}
                  height="128px"
                  cursor="pointer"
                  onClick={() => onClickItem(PHI_OBJECT_CONTRACT_ADDRESS, metadata.tokenId)}
                >
                  <Box width="96px" height="96px" position="relative">
                    <Image src={metadata.image_url} layout="fill" objectFit="contain" />
                  </Box>
                </Center>
              );
            })}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Quest;
