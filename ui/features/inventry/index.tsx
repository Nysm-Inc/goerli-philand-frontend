import Image from "next/image";
import { FC } from "react";
import { Box, Center, Modal, ModalBody, ModalContent, ModalHeader, SimpleGrid } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { phiObjectMetadataList } from "~/types/object";
import { IObject } from "~/game/types";

const Inventry: FC<{
  readonly: boolean;
  items: IObject[];
  isOpen: boolean;
  onClose: () => void;
  onClickItem: (object: IObject) => void;
}> = ({ readonly, items, isOpen, onClose, onClickItem }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl" scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none">
        <ModalHeader>Inventory</ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {items.map((item, i) => (
              <Center
                key={i}
                height="128px"
                cursor={readonly ? "" : "pointer"}
                onClick={() => {
                  if (readonly) return;
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
