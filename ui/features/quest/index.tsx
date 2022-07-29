import Image from "next/image";
import { FC, useContext, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, HStack, SimpleGrid, Text, useBoolean, VStack } from "@chakra-ui/react";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { ObjectMetadata, objectMetadataList, objectTraisList } from "~/types/object";
import { ClaimableList } from "~/types/quest";
import { IconButton, Modal, ModalBody, ModalHeader, Icon, Badge, Network, Message } from "~/ui/components";
import { AppContext } from "~/contexts";
import ClaimButton from "./ClaimButton";
import Detail from "./Detail";

const Quest: FC<{
  claimableList: ClaimableList;
  claimedList: boolean[];
  totalSupply: { [tokenId: number]: number };
  isOpen: boolean;
  onOpenCollection: () => void;
  onClose: () => void;
  onClickItem: (tokenId: number) => Promise<TransactionResponse | undefined>;
  onClickUpdate: () => Promise<void>;
}> = ({ claimableList, claimedList, totalSupply, isOpen, onOpenCollection, onClose, onClickItem, onClickUpdate }) => {
  const { colorMode } = useContext(AppContext);
  const [selected, setSelected] = useState<(ObjectMetadata & { claimable: boolean; claimed: boolean }) | undefined>(undefined);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();

  return (
    <Modal w="832px" h="712px" isOpen={isOpen} onClose={onClose} onCloseComplete={() => setSelected(undefined)}>
      <ModalHeader
        title="QUEST"
        buttons={[
          <IconButton
            key="refresh"
            ariaLabel="refresh"
            icon={<Icon name="refresh" color={colorMode === "light" ? "grey.900" : "white"} />}
            size="32px"
            borderRadius="8px"
            boxShadow={false}
            isLoading={isLoading}
            onClick={() => {
              startLoading();
              onClickUpdate();
              setTimeout(() => stopLoading(), 8000);
            }}
          />,
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
            size="32px"
            borderRadius="8px"
            boxShadow={false}
            onClick={onClose}
          />,
        ]}
        back={
          selected ? (
            <IconButton
              key="back"
              ariaLabel="back"
              icon={<Icon name="arrow" transform="rotate(180)" color={colorMode === "light" ? "grey.900" : "white"} />}
              size="32px"
              borderRadius="8px"
              boxShadow={false}
              onClick={() => setSelected(undefined)}
            />
          ) : undefined
        }
      />
      <Box h="16px" />
      <ModalBody>
        {selected ? (
          <Detail
            selected={selected}
            totalSupply={totalSupply}
            onClick={() => onClickItem(selected.tokenId)}
            onClickAfterTx={() => {
              onClose();
              onOpenCollection();
            }}
          />
        ) : (
          <SimpleGrid columns={3} spacing="8px">
            {Object.values(objectMetadataList[QUEST_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
              const claimable = Boolean(claimableList.find((v) => v.TokenId === metadata.tokenId.toString()));
              const claimed = claimedList.length > 0 && claimedList[metadata.tokenId - 1];
              return (
                <VStack
                  key={i}
                  height="calc(348px - 16px - 8px)"
                  p="16px"
                  spacing="16px"
                  borderRadius="16px"
                  align="flex-start"
                  bgColor={colorMode === "light" ? "white" : "grey.900"}
                >
                  <Center
                    w="100%"
                    h="144px"
                    cursor="pointer"
                    {...(!claimable && { opacity: 0.5 })}
                    onClick={() => setSelected({ ...metadata, claimable, claimed })}
                  >
                    <Box position="relative" w="96px" h="96px">
                      <Image src={metadata.image_url} layout="fill" objectFit="contain" quality={100} draggable={false} />
                    </Box>
                  </Center>
                  <VStack spacing="8px" align="flex-start">
                    <Text textStyle="label-2" color="grey.500">
                      {/* {objectTraisList[QUEST_OBJECT_CONTRACT_ADDRESS][metadata.tokenId].attributes[7].value} */}
                      Project Name
                    </Text>
                    <Text textStyle="headline-2" color={colorMode === "light" ? "grey.900" : "white"}>
                      {metadata.name}
                    </Text>
                    <HStack spacing="8px">
                      <Badge text={`EXP ${metadata.EXP || 0}`} />
                      <Network tokenId={metadata.tokenId} />
                    </HStack>
                  </VStack>
                  <ClaimButton
                    claimable={claimable}
                    claimed={claimed}
                    onClick={() => onClickItem(metadata.tokenId)}
                    onClickAfterTx={() => {
                      onClose();
                      onOpenCollection();
                    }}
                  />
                </VStack>
              );
            })}
          </SimpleGrid>
        )}
      </ModalBody>
      <Box minH="16px" />
      <Message color="info" text="All quests (except EXP quests) are based on your activity on the Ethereum Goerli Testnet." />
    </Modal>
  );
};

export default Quest;
