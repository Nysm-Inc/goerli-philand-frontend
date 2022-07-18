import Image from "next/image";
import { FC, ReactNode, useContext, useState } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, Flex, HStack, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { ObjectMetadata, objectMetadataList, objectTraisList } from "~/types/object";
import { ClaimableList, conditionList } from "~/types/quest";
import { Button, IconButton, Modal, ModalBody, ModalHeader, Icon } from "~/ui/components";
import { AppContext } from "~/contexts";

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
        {objectTraisList[QUEST_OBJECT_CONTRACT_ADDRESS][tokenId]?.attributes[0]?.value}
      </Text>
    </HStack>
  );
};

const ClaimButton: FC<{ claimable: boolean; claimed: boolean; onClick: () => void }> = ({ claimable, claimed, onClick }) => (
  <>
    {claimable && !claimed ? (
      <Button w="full" color="purple" onClick={onClick}>
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
          <Button w="full" disabled>
            <Text color="white" textStyle="button-1">
              Not Eligible
            </Text>
          </Button>
        )}
      </>
    )}
  </>
);

const Row: FC<{ idx: number; length: number; children?: ReactNode }> = ({ idx, length, children }) => {
  const { colorMode } = useContext(AppContext);

  let radius = "";
  if (idx === 0 && idx === length - 1) {
    radius = "12px";
  } else if (idx === 0) {
    radius = "12px 12px 0 0";
  } else if (idx === length - 1) {
    radius = "0 0 12px 12px";
  }
  return (
    <Flex
      p="16px"
      gap="16px"
      w="730px"
      h="56px"
      align="center"
      borderRadius={radius}
      bgColor={colorMode === "light" ? "#F5F2EB" : "#292929"}
    >
      {children}
    </Flex>
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
  const [selected, setSelected] = useState<(ObjectMetadata & { claimable: boolean; claimed: boolean }) | undefined>(undefined);
  const { colorMode } = useContext(AppContext);

  return (
    <Modal w="858px" h="700px" isOpen={isOpen} onClose={() => {}}>
      <ModalHeader
        title="QUEST"
        buttons={
          selected
            ? [
                <IconButton
                  key="back"
                  ariaLabel="back"
                  icon={<Icon name="close" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} transform="rotate(180)" />}
                  size={32}
                  borderRadius={8}
                  boxShadow={false}
                  onClick={() => setSelected(undefined)}
                />,
              ]
            : [
                <IconButton
                  key="refresh"
                  ariaLabel="refresh"
                  icon={<Icon name="refresh" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
                  size={32}
                  borderRadius={8}
                  boxShadow={false}
                  onClick={onClickUpdate}
                />,
                <IconButton
                  key="close"
                  ariaLabel="close"
                  icon={<Icon name="close" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
                  size={32}
                  borderRadius={8}
                  boxShadow={false}
                  onClick={onClose}
                />,
              ]
        }
      />
      <ModalBody>
        {selected ? (
          <VStack p="32px 27px" spacing="32px" bgColor={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>
            <HStack spacing="32px" w="730px" h="293px">
              <Center w="294px" h="294px" borderRadius="8px" border="1px solid" borderColor={colorMode === "light" ? "#CECCC9" : "#333333"}>
                <Box minW="144px" maxW="144px" minH="144px" maxH="144px" position="relative">
                  <Image src={selected.image_url} layout="fill" objectFit="contain" />
                </Box>
              </Center>
              <VStack w="404px" h="100%" spacing="24px" align="flex-start">
                <Text textStyle="headline-1" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
                  {selected.name}
                </Text>
                <VStack spacing="10px" align="flex-start">
                  <HStack spacing="4px">
                    <Image src="/icons/eth.svg" width="24px" height="24px" />
                    <Text textStyle="label-1" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
                      {selected.EXP} EXP
                    </Text>
                  </HStack>
                  <HStack>
                    <Image src="/icons/eth.svg" width="24px" height="24px" />
                    <Text textStyle="label-1" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
                      XXX Claimed
                    </Text>
                  </HStack>
                  <HStack>
                    <Image src="/icons/eth.svg" width="24px" height="24px" />
                    <Text textStyle="label-1" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
                      April XX, 2022 - Sep XX 2022
                    </Text>
                  </HStack>
                </VStack>
                <Box w="134px">
                  <ClaimButton claimable={selected.claimable} claimed={selected.claimed} onClick={() => onClickItem(selected.tokenId)} />
                </Box>
              </VStack>
            </HStack>
            <Text w="720px" h="40px" textStyle="paragraph-2" color={colorMode === "light" ? "#808080" : "#CCCCCC"}>
              {objectTraisList[QUEST_OBJECT_CONTRACT_ADDRESS][selected.tokenId]?.description}
            </Text>
            <VStack spacing="16px" align="flex-start">
              <Text textStyle="headline-2" color="#808080">
                Requirements
              </Text>
              <VStack spacing="2px">
                <Row idx={0} length={3} />
                <Row idx={1} length={3} />
                <Row idx={2} length={3} />
              </VStack>
            </VStack>
            {conditionList[selected.tokenId].links.length > 0 && (
              <VStack spacing="16px" align="flex-start">
                <Text textStyle="headline-2" color="#808080">
                  References
                </Text>
                <VStack spacing="2px">
                  {conditionList[selected.tokenId].links.map((link, i) => (
                    <Row key={i} idx={i} length={conditionList[selected.tokenId].links.length}>
                      <Center w="32px" h="32px" bgColor="#FFFFFF" borderRadius="8px">
                        <Icon name="link" width="16px" height="16px" color="#1A1A1A" />
                      </Center>
                      <Link
                        href={link.url}
                        isExternal
                        textStyle="paragraph-2"
                        cursor="pointer"
                        color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}
                      >
                        {link.title}
                      </Link>
                    </Row>
                  ))}
                </VStack>
              </VStack>
            )}
          </VStack>
        ) : (
          <SimpleGrid columns={3} spacing="8px">
            {Object.values(objectMetadataList[QUEST_OBJECT_CONTRACT_ADDRESS]).map((metadata, i) => {
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
                  <Box
                    w="100%"
                    minH="144px"
                    maxH="144px"
                    position="relative"
                    cursor="pointer"
                    {...(!claimable && { opacity: 0.5 })}
                    onClick={() => setSelected({ ...metadata, claimable, claimed })}
                  >
                    <Image src={metadata.image_url} layout="fill" objectFit="contain" />
                  </Box>
                  <Text textStyle="headline-2" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
                    {metadata.name}
                  </Text>
                  <HStack spacing="8px">
                    <EXP exp={metadata.EXP || 0} />
                    <Network tokenId={metadata.tokenId} />
                  </HStack>
                  <ClaimButton claimable={claimable} claimed={claimed} onClick={() => onClickItem(metadata.tokenId)} />
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
