import Image from "next/image";
import { FC } from "react";
import { Box, Center, Modal, ModalBody, ModalContent, ModalHeader, SimpleGrid } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { phiObjectMetadataList } from "~/types/object";

const Inventry: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const items = [
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 1 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 2 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 3 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 4 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 5 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 6 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 7 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 8 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 9 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 10 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 11 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 12 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 13 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 14 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 15 },
    { contractAddress: PHI_OBJECT_CONTRACT_ADDRESS, tokenId: 16 },
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
                // onClick={() => {}}
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
