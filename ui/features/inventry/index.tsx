import Image from "next/image";
import { FC } from "react";
import { Box, Center, Modal, ModalBody, ModalContent, ModalHeader, SimpleGrid } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { phiObjectMetadataList } from "~/types/object";
import { IObject } from "~/game/types";

const Inventry: FC<{ isOpen: boolean; onClose: () => void; onClickItem: (object: IObject) => void }> = ({
  isOpen,
  onClose,
  onClickItem,
}) => {
  const items: IObject[] = [
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 1, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 2, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 3, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 4, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 5, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 6, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 7, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 8, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 9, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 10, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 11, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 12, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 13, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 14, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 15, sizeX: 1, sizeY: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 16, sizeX: 1, sizeY: 1 },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl" scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none">
        <ModalHeader>Inventory - not connected to onchain</ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {items.map((item, i) => (
              <Center
                key={i}
                height="128px"
                cursor="pointer"
                onClick={() => {
                  onClickItem(item);
                  onClose();
                }}
              >
                <Box width="96px" height="96px" position="relative">
                  <Image
                    src={phiObjectMetadataList[item.contractAddress][item.tokenId].image_url}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </Center>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Inventry;
