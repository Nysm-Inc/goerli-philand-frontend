import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Box, Center, Modal, ModalBody, ModalContent, ModalHeader, SimpleGrid } from "@chakra-ui/react";
import { phiObjectMetadataList } from "~/types/object";
import { IObject } from "~/types";

const Inventory: FC<{
  items: IObject[];
  isOpen: boolean;
  readonly?: boolean;
  onClose: () => void;
  onClickItem: (object: IObject) => void;
}> = ({ readonly, items: originItems, isOpen, onClose, onClickItem }) => {
  const [items, setItems] = useState<IObject[]>([]);

  useEffect(() => {
    if (!readonly) return;

    setItems(originItems);
  }, [isOpen, originItems.length]);
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
                  setItems((prev) =>
                    prev.filter((p) => !(p.contractAddress === item.contractAddress && p.tokenId === item.tokenId))
                  );
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

export default Inventory;
