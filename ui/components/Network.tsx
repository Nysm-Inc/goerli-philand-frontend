import { HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useContext } from "react";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { AppContext } from "~/contexts";
import { objectTraisList } from "~/types/object";

const Network: FC<{ tokenId: number }> = ({ tokenId }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <HStack h="24px" p="2px 8px 2px 4px" borderRadius="16px" spacing="4px" bgColor={colorMode === "light" ? "grey.100" : "dark.grey700"}>
      <Image src="/icons/eth_logo.svg" width="16px" height="16px" />
      <Text textStyle="label-2" color={colorMode === "light" ? "grey.900" : "white"}>
        {objectTraisList[QUEST_OBJECT_CONTRACT_ADDRESS][tokenId]?.attributes[0]?.value}
      </Text>
    </HStack>
  );
};

export default Network;
