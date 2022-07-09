import Image from "next/image";
import { FC, useContext, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import axios from "axios";
import { Box, Center, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { ObjectMetadata, objectMetadataList, ObjectTraits } from "~/types/object";
import { ClaimableList } from "~/types/quest";
import { Button, IconButton, Modal, ModalBody, ModalHeader, Icon } from "~/ui/components";
import { AppContext } from "~/contexts";

let traits: { [tokenId: number]: ObjectTraits } = {};
const getTraits = () => {
  Promise.all(
    Object.values(objectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map(async (meta) => {
      const res = await axios.get<ObjectTraits>(meta.json_url);
      traits = { ...traits, [meta.tokenId]: res.data };
    })
  );
};
getTraits();

// todo: Label.tsx ?
const EXP: FC<{ exp: number }> = ({ exp }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Center display="inline-block" p="2px 4px" h="20px" borderRadius="4px" bgColor={colorMode === "light" ? "#292929" : "#CCCCCC"}>
      <Text textStyle="label-2" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>{`EXP:${exp}`}</Text>
    </Center>
  );
};

const Network: FC<{ tokenId: number }> = ({ tokenId }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <HStack h="24px" p="2px 8px 2px 4px" borderRadius="16px" spacing="4px" bgColor={colorMode === "light" ? "#EEEEEE" : "#333333"}>
      <Image src="/icons/eth_logo.svg" width="16px" height="16px" />
      <Text textStyle="label-2" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
        {/* todo */}
        {traits[tokenId]?.attributes[0]?.value}
      </Text>
    </HStack>
  );
};

const Quest: FC<{
  claimableList: ClaimableList;
  claimedList: boolean[];
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
          <SimpleGrid columns={3} spacing="8px">
            {Object.values(objectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
              const claimable = Boolean(claimableList.find((v) => v.TokenId === metadata.tokenId.toString()));
              const claimed = claimedList.length > 0 && claimedList[metadata.tokenId - 1];
              return (
                <VStack
                  key={i}
                  height="320px"
                  p="16px"
                  align="flex-start"
                  borderRadius="16px"
                  bgColor={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}
                >
                  <Box w="100%" minH="144px" maxH="144px" position="relative" {...(!claimable && { opacity: 0.5 })}>
                    <Image src={metadata.image_url} layout="fill" objectFit="contain" />
                  </Box>
                  <Text textStyle="headline-2" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
                    {metadata.name}
                  </Text>

                  <HStack spacing="8px">
                    <EXP exp={metadata.EXP || 0} />
                    <Network tokenId={metadata.tokenId} />
                  </HStack>

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
