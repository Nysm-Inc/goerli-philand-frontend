import { FC } from "react";
import { Box, Center, Modal, ModalBody, ModalContent, ModalHeader, SimpleGrid } from "@chakra-ui/react";
import { Balance } from "~/types";
import Image from "next/image";
import { phiObjectMetadataList } from "~/types/object";

const Collection: FC<{ balances: Balance[]; isOpen: boolean; onClose: () => void }> = ({
  balances,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl" scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none">
        <ModalHeader>Collection</ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {balances.map((balance, i) => {
              return (
                <>
                  {balance.amount > 0 && (
                    <Center key={i} height="128px" cursor="pointer">
                      <Box width="96px" height="96px" position="relative">
                        <Image
                          src={phiObjectMetadataList[balance.contract][balance.tokenId].image_url}
                          layout="fill"
                          objectFit="contain"
                        />
                      </Box>
                    </Center>
                  )}
                </>
              );
            })}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Collection;
