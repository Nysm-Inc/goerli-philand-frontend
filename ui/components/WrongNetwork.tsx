import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useContext } from "react";
import { chain, useDisconnect, useSwitchNetwork } from "wagmi";
import { AppContext } from "~/contexts";
import { Modal, ModalHeader } from "./common/Modal";

const WrongNetwork: FC = () => {
  const { colorMode } = useContext(AppContext);
  const { switchNetwork } = useSwitchNetwork({ chainId: chain.polygonMumbai.id });
  const { disconnect } = useDisconnect();

  return (
    <Modal w="456px" h="328px" isOpen clickThrough onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <Box h="24px" />
      <VStack w="408px" h="224px" spacing="24px">
        <VStack spacing="8px">
          <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
            Switch Networks
          </Text>
          <Text textStyle="paragraph-1" color="grey.500" textAlign="center">
            Wrong network detected, switch or disconnect to continue.
          </Text>
        </VStack>
        <VStack spacing="0px" bgColor={colorMode === "light" ? "white" : "dark.grey800"} borderRadius="12px">
          <HStack
            w="408px"
            h="56px"
            p="12px 16px"
            spacing="8px"
            align="center"
            cursor="pointer"
            _hover={{ bgColor: colorMode === "light" ? "warmgrey.90" : "dark.grey700", borderRadius: "12px" }}
            onClick={() => switchNetwork?.()}
          >
            <Image src="/icons/polygon_logo.svg" width="32px" height="32px" alt="" />
            <Text textStyle="button-2" color={colorMode === "light" ? "grey.900" : "white"}>
              Polygon Mumbai
            </Text>
          </HStack>
          <HStack
            w="408px"
            h="56px"
            p="12px 16px"
            spacing="8px"
            align="center"
            cursor="pointer"
            _hover={{ bgColor: colorMode === "light" ? "warmgrey.90" : "dark.grey700", borderRadius: "12px" }}
            onClick={() => disconnect()}
          >
            <Image src="/icons/disconnect.svg" width="32px" height="32px" alt="" />
            <Text textStyle="button-2" color="red.250">
              Disconnect
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default WrongNetwork;
