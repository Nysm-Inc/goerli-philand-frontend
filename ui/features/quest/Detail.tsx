import Image from "next/image";
import { FC, ReactNode, useContext } from "react";
import type { TransactionResponse } from "@ethersproject/providers";
import { Box, Center, Flex, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { AppContext } from "~/contexts";
import { ObjectMetadata, objectTraisList } from "~/types/object";
import { conditionList } from "~/types/quest";
import Icon from "~/ui/components/Icon";
import Network from "~/ui/components/Network";
import Badge from "~/ui/components/common/Badge";
import ClaimButton from "./ClaimButton";

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
      bgColor={colorMode === "light" ? "light.lg_orange40" : "dark.grey800"}
    >
      {children}
    </Flex>
  );
};

const Detail: FC<{
  selected: ObjectMetadata & { claimable: boolean; claimed: boolean };
  totalSupply: { [tokenId: number]: number };
  onClick: () => Promise<TransactionResponse | undefined>;
  onClickAfterTx: () => void;
}> = ({ selected, totalSupply, onClick, onClickAfterTx }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <VStack p="32px 27px" spacing="32px" bgColor={colorMode === "light" ? "white" : "grey.900"}>
      <HStack spacing="32px" w="730px" h="293px">
        <Center
          w="294px"
          h="294px"
          borderRadius="8px"
          border="1px solid"
          borderColor={colorMode === "light" ? "light.g_orange" : "dark.grey700"}
        >
          <Box minW="144px" maxW="144px" minH="144px" maxH="144px" position="relative">
            <Image src={selected.image_url} layout="fill" objectFit="contain" draggable={false} alt="" />
          </Box>
        </Center>
        <VStack w="404px" h="100%" spacing="24px" align="flex-start">
          <VStack spacing="8px" align="flex-start">
            <Text textStyle="label-1" color="grey.500">
              {selected.relatedProject}
            </Text>
            <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
              {selected.name}
            </Text>
          </VStack>
          <VStack spacing="12px" align="flex-start">
            <HStack spacing="8px">
              <Badge text={`EXP ${selected.EXP || 0}`} />
              <Network tokenId={selected.tokenId} />
            </HStack>
            <HStack spacing="8px">
              <Icon name="checkCircle" color={colorMode === "light" ? "grey.900" : "white"} />
              <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "white"}>
                {totalSupply[selected.tokenId]} Claimed
              </Text>
            </HStack>
            <HStack spacing="8px">
              <Icon name="expand" color={colorMode === "light" ? "grey.900" : "white"} />
              <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "white"}>
                {`${selected.size[0]}x${selected.size[1]}`}
              </Text>
            </HStack>
            <HStack spacing="8px">
              <Icon name="man" color={colorMode === "light" ? "grey.900" : "white"} />
              <Text textStyle="label-1" color={colorMode === "light" ? "grey.900" : "white"}>
                {selected.creator}
              </Text>
            </HStack>
          </VStack>
          <Box w={selected.claimable ? "134px" : "200px"}>
            <ClaimButton claimable={selected.claimable} claimed={selected.claimed} onClick={onClick} onClickAfterTx={onClickAfterTx} />
          </Box>
        </VStack>
      </HStack>
      <Text w="720px" h="40px" textStyle="paragraph-2" color={colorMode === "light" ? "grey.500" : "grey.200"}>
        {objectTraisList[QUEST_OBJECT_CONTRACT_ADDRESS][selected.tokenId]?.description}
      </Text>
      <VStack spacing="16px" align="flex-start">
        <Text textStyle="headline-2" color="grey.500">
          Requirements
        </Text>
        <VStack spacing="2px">
          {conditionList[selected.tokenId].activities.map((activity, i) => (
            <Row key={i} idx={i} length={conditionList[selected.tokenId].activities.length}>
              <Center
                w="32px"
                h="32px"
                borderRadius="8px"
                bgColor={selected.claimable ? (colorMode === "light" ? "grey.900" : "white") : colorMode === "light" ? "white" : "grey.900"}
              >
                <Icon
                  name="check"
                  width="16px"
                  height="16px"
                  color={
                    selected.claimable
                      ? colorMode === "light"
                        ? "white"
                        : "grey.900"
                      : colorMode === "light"
                      ? "dark.grey300"
                      : "grey.500"
                  }
                />
              </Center>
              <Text textStyle="paragraph-2" color={colorMode === "light" ? "grey.900" : "white"}>
                {activity}
              </Text>
            </Row>
          ))}
        </VStack>
      </VStack>
      {conditionList[selected.tokenId].links.length > 0 && (
        <VStack spacing="16px" align="flex-start">
          <Text textStyle="headline-2" color="grey.500">
            References
          </Text>
          <VStack spacing="2px">
            {conditionList[selected.tokenId].links.map((link, i) => (
              <Row key={i} idx={i} length={conditionList[selected.tokenId].links.length}>
                <Center w="32px" h="32px" bgColor="white" borderRadius="8px">
                  <Icon name="link" width="16px" height="16px" color="grey.900" />
                </Center>
                <Link
                  href={link.url}
                  isExternal
                  textStyle="paragraph-2"
                  cursor="pointer"
                  color={colorMode === "light" ? "grey.900" : "white"}
                >
                  {link.title}
                </Link>
              </Row>
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default Detail;
