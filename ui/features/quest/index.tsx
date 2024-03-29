import Image from "next/image";
import { FC, useContext, useState } from "react";
import type { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, HStack, SimpleGrid, Text, useBoolean, VStack } from "@chakra-ui/react";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { objectMetadataList } from "~/types/object";
import { QuestClaimableList, QuestProgressList } from "~/types/quest";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";
import Network from "~/ui/components/Network";
import Message from "~/ui/components/Message";
import NewBadge from "~/ui/components/NewBadge";
import Size from "~/ui/components/Size";
import { Modal, ModalBody, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import Badge from "~/ui/components/common/Badge";
import ClaimButton from "./ClaimButton";
import Detail, { Selected } from "./Detail";

const metadataList = Object.values(objectMetadataList[QUEST_OBJECT_CONTRACT_ADDRESS]);

const newQuestIds = [2, 9, 16, 43, 44, 45, 46, 97, 100, 101, 102];

const disableQuestIds = [43, 44, 45, 46];

const Quest: FC<{
  claimableList: QuestClaimableList;
  claimedList: { [tokenId: number]: boolean };
  progressList: QuestProgressList;
  totalSupply: { [tokenId: number]: number };
  isOpen: boolean;
  onClose: () => void;
  onClickItem: (tokenId: number) => Promise<TransactionResponse | undefined>;
  onClickUpdate: () => Promise<void>;
  onClickNavi: () => void;
  onRefetch: () => void;
}> = ({ claimableList, claimedList, progressList, totalSupply, isOpen, onClose, onClickItem, onClickUpdate, onClickNavi, onRefetch }) => {
  const { colorMode } = useContext(AppContext);
  const [selected, setSelected] = useState<Selected | undefined>(undefined);
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
              setTimeout(() => stopLoading(), 10000);
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
            onClickNavi={onClickNavi}
            onRefetch={onRefetch}
          />
        ) : (
          <SimpleGrid columns={3} spacing="8px">
            {metadataList.map((metadata, i) => {
              const claimable = Boolean(claimableList[metadata.tokenId]);
              const claimed = claimedList[metadata.tokenId];
              const progress = {
                counter: progressList[metadata.tokenId]?.counter || 0,
                value: progressList[metadata.tokenId]?.value || 1,
              };

              if (disableQuestIds.includes(metadata.tokenId)) {
                return <></>;
              }
              return (
                <VStack
                  key={i}
                  position="relative"
                  height="calc(348px - 16px - 8px)"
                  p="16px"
                  spacing="16px"
                  borderRadius="16px"
                  align="flex-start"
                  cursor="pointer"
                  bgColor={colorMode === "light" ? "white" : "grey.900"}
                  _hover={{ bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700" }}
                  onClick={() => setSelected({ ...metadata, claimable, claimed, progress })}
                >
                  {newQuestIds.includes(metadata.tokenId) && (
                    <Box position="absolute">
                      <NewBadge />
                    </Box>
                  )}
                  <Center position="relative" w="100%" h="144px" cursor="pointer" {...(!claimable && { opacity: 0.5 })}>
                    <Box position="relative" w="96px" h="96px">
                      <Image src={metadata.image_url} layout="fill" objectFit="contain" draggable={false} alt="" />
                    </Box>
                    <Box position="absolute" bottom="0" right="0">
                      <Size sizeX={metadata.size[0]} sizeY={metadata.size[1]} />
                    </Box>
                  </Center>
                  <VStack spacing="8px" align="flex-start">
                    <Text textStyle="label-2" color="grey.500">
                      {metadata.relatedProject}
                    </Text>
                    <Text textStyle="headline-2" color={colorMode === "light" ? "grey.900" : "white"}>
                      {metadata.name}
                    </Text>
                    <HStack spacing="8px">
                      <Badge text={`EXP ${metadata.EXP?.toLocaleString()}`} />
                      <Network tokenId={metadata.tokenId} />
                    </HStack>
                  </VStack>
                  <ClaimButton
                    claimable={claimable}
                    progress={progress}
                    claimed={claimed}
                    onClick={() => onClickItem(metadata.tokenId)}
                    onClickNavi={onClickNavi}
                    onRefetch={onRefetch}
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
