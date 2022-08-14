import Image from "next/image";
import { FC, useContext } from "react";
import { Box, Center, Flex, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { HOWTOPLAY_URL } from "~/constants";
import { AppContext } from "~/contexts";

const LetsConnect: FC = () => {
  const { colorMode } = useContext(AppContext);

  return (
    <VStack
      zIndex="default"
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      w="512px"
      h="559px"
      p="24px"
      spacing="0px"
      borderRadius="32px"
      border="1px solid"
      // todo
      borderColor={colorMode === "light" ? "warmgrey.70" : "dark.grey800"}
      bgColor={colorMode === "light" ? "light.lg_orange30" : "grey.900"}
    >
      <Center w="128px" h="128px">
        <Image src="/icons/ENShold.png" width="96px" height="96px" priority quality={100} alt="" />
      </Center>
      <VStack p="0px 0px 24px" spacing="8px" w="464px" h="112px">
        <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
          Let’s connect your wallet!
        </Text>
        <Text textStyle="paragraph-1" color="grey.500">
          You need ENS to have your PHI land.
        </Text>
        <Link
          color="primary.500"
          textStyle="button-2"
          _focusVisible={{ boxShadow: "none" }}
          href={HOWTOPLAY_URL + "#0c6980291bc1487ba3100b905d4e563b"}
          isExternal
        >
          Don’t know how to get ENS?
        </Link>
      </VStack>
      <VStack
        p="24px"
        spacing="16px"
        w="464px"
        h="272px"
        borderRadius="16px"
        align="flex-start"
        bgColor={colorMode === "light" ? "white" : "dark.grey800"}
      >
        <Text textStyle="paragraph-1" color="grey.500">
          Please check the following items to start PHI.
        </Text>
        <VStack spacing="4px" w="416px" h="128px">
          <HStack p="8px" spacing="8px" w="416px" h="40px" borderRadius="8px" bgColor={colorMode === "light" ? "warmgrey.90" : "grey.900"}>
            <Image src="/icons/ens.png" width="24px" height="24px" alt="" />
            <Text textStyle="paragraph-2" color="grey.500">
              Owning ENS on Ethereum Goerli Testnet
            </Text>
          </HStack>
          <HStack p="8px" spacing="8px" w="416px" h="40px" borderRadius="8px" bgColor={colorMode === "light" ? "warmgrey.90" : "grey.900"}>
            <Image src="/icons/eth_logo.svg" width="24px" height="24px" alt="" />
            <Text textStyle="paragraph-2" color="grey.500">
              Holding ETH on Ethereum Goerli Testnet
            </Text>
          </HStack>
          <HStack p="8px" spacing="8px" w="416px" h="40px" borderRadius="8px" bgColor={colorMode === "light" ? "warmgrey.90" : "grey.900"}>
            <Image src="/icons/polygon_logo.svg" width="24px" height="24px" alt="" />
            <Text textStyle="paragraph-2" color="grey.500">
              Holding MATIC on Polygon Mumbai Testnet
            </Text>
          </HStack>
        </VStack>
        <Link color="primary.500" textStyle="button-2" _focusVisible={{ boxShadow: "none" }} href={HOWTOPLAY_URL} isExternal>
          How do I satisfy these items?
        </Link>
      </VStack>
    </VStack>
  );
};

// F6F3ED;

export default LetsConnect;
