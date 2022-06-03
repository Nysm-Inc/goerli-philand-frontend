import { FC, Fragment, useEffect, useState } from "react";
import { Box, Center, Modal, ModalBody, ModalContent, ModalHeader, SimpleGrid } from "@chakra-ui/react";
import { BalanceObject } from "~/types";
import Image from "next/image";
import { phiObjectMetadataList } from "~/types/object";

const Collection: FC<{ items: BalanceObject[]; readonly?: boolean; isOpen: boolean; onClose: () => void }> = ({
  items: originItems,
  readonly,
  isOpen,
  onClose,
}) => {
  const [items, setItems] = useState<BalanceObject[]>([]);

  useEffect(() => {
    if (!readonly) return;

    setItems(originItems);
  }, [isOpen, originItems.length]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl" scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none">
        <ModalHeader>Collection</ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {items.map((item, i) => {
              return (
                <Fragment key={i}>
                  {item.amount > 0 && (
                    <Center height="128px" cursor="pointer">
                      <Box width="96px" height="96px" position="relative">
                        <Image
                          src={phiObjectMetadataList[item.contract][item.tokenId].image_url}
                          layout="fill"
                          objectFit="contain"
                        />
                      </Box>
                    </Center>
                  )}
                </Fragment>
              );
            })}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Collection;
