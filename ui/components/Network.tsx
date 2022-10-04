import { HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useContext } from "react";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { AppContext } from "~/contexts";
import { objectTraits } from "~/types/object";

const getLogo = (network?: string): string => {
  switch (network) {
    case "Goerli": {
      return "/icons/eth_logo.svg";
    }
    case "Mumbai": {
      return "/icons/polygon_logo.svg";
    }
    default: {
      return "/icons/eth_logo.svg";
    }
  }
};

const Network: FC<{ tokenId: number }> = ({ tokenId }) => {
  const { colorMode } = useContext(AppContext);
  const networkName = objectTraits[QUEST_OBJECT_CONTRACT_ADDRESS][tokenId]?.attributes.network;

  return (
    <HStack h="24px" p="2px 8px 2px 4px" borderRadius="16px" spacing="4px" bgColor={colorMode === "light" ? "grey.100" : "dark.grey700"}>
      <Image src={getLogo(networkName)} width="16px" height="16px" alt="" />
      <Text textStyle="label-2" color={colorMode === "light" ? "grey.900" : "white"}>
        {networkName}
      </Text>
    </HStack>
  );
};

export default Network;
