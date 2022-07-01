import Image from "next/image";
import { FC, useContext, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { ObjectMetadata, objectMetadataList } from "~/types/object";
import { ClaimableList } from "~/types/quest";
import { BalanceObject } from "~/types";
import { Button, IconButton, Modal, ModalBody, ModalHeader, Icon } from "~/ui/components";
import { AppContext } from "~/contexts";

const Quest: FC<{
  claimableList: ClaimableList;
  claimedList: BalanceObject[];
  isOpen: boolean;
  onClose: () => void;
  onClickItem: (tokenId: number) => Promise<TransactionResponse | undefined>;
  onClickUpdate: () => Promise<void>;
}> = ({ claimableList, claimedList, isOpen, onClose, onClickItem, onClickUpdate }) => {
  const [selected, setSelected] = useState<ObjectMetadata | undefined>(undefined);
  const { colorMode } = useContext(AppContext);
  return (
    <Modal w="858px" h="700px" isOpen={isOpen} onClose={() => {}}>
      <ModalHeader
        title="QUEST"
        buttons={[
          <IconButton
            key="refresh"
            ariaLabel="refresh"
            icon={<Icon name="refresh" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            size={32}
            onClick={onClickUpdate}
          />,
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            size={32}
            onClick={onClose}
          />,
        ]}
      />
      <ModalBody>
        {selected ? (
          <></>
        ) : (
          <SimpleGrid columns={3}>
            {Object.values(objectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
              const claimable = Boolean(claimableList.find((v) => v.TokenId === metadata.tokenId.toString()));
              const claimed = Boolean(claimedList.find((v) => v.tokenId === metadata.tokenId));
              return (
                <VStack key={i} height="320px" p="16px">
                  <Box w="100%" minH="144px" maxH="144px" position="relative" {...(!claimable && { opacity: 0.5 })}>
                    <Image src={metadata.image_url} layout="fill" objectFit="contain" />
                  </Box>
                  <Text>{metadata.name}</Text>
                  <Text>Description</Text>
                  <Text>Exp</Text>
                  {claimable && !claimed ? (
                    <Button w="full" color="purple" onClick={() => onClickItem(metadata.tokenId)}>
                      <Text color="white" textStyle="button-1">
                        Claim
                      </Text>
                    </Button>
                  ) : (
                    <>
                      {claimed ? (
                        <Button w="full" leftIcon={<Icon name="check" />}>
                          <Text color="white" textStyle="button-1">
                            Claimed
                          </Text>
                        </Button>
                      ) : (
                        <Button w="full" disabled />
                      )}
                    </>
                  )}
                </VStack>
              );
            })}
          </SimpleGrid>
        )}
      </ModalBody>
    </Modal>
  );
};

export default Quest;
