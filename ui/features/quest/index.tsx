import Image from "next/image";
import { FC } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Button, Center, Flex, Modal, ModalBody, ModalContent, ModalHeader, SimpleGrid, Text } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { objectMetadataList } from "~/types/object";
import { ClaimableList } from "~/types/quest";

const Quest: FC<{
  claimableList: ClaimableList;
  isOpen: boolean;
  onClose: () => void;
  onClickItem: (tokenId: number) => Promise<TransactionResponse | undefined>;
  onClickRefetch: () => Promise<void>;
}> = ({ claimableList, isOpen, onClose, onClickItem, onClickRefetch }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalContent border="2px solid" borderColor="black" borderRadius="none" minW="600px" minH="600px" maxW="600px" maxH="600px">
        <ModalHeader>
          <Flex justify="space-between">
            <Text>Quest</Text>
            <Button onClick={onClickRefetch}>😆</Button>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <SimpleGrid columns={3} spacing="16px">
            {Object.values(objectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
              const claimable = Boolean(claimableList.find((v) => v.TokenId === metadata.tokenId.toString()));
              return (
                <Center
                  key={i}
                  height="128px"
                  {...(claimable
                    ? {
                        cursor: "pointer",
                        onClick: () => onClickItem(metadata.tokenId),
                      }
                    : {
                        bgColor: "blackAlpha.400",
                        opacity: 0.6,
                      })}
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
