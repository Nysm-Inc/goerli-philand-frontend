import Image from "next/image";
import { FC, useContext } from "react";
import { Link, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { HOWTOPLAY_URL } from "~/constants";
import { Modal, ModalHeader } from "./common/Modal";
import Button from "./common/Button";
import { createPhiSubdomain } from "~/utils/ens";
import { useAccount } from "wagmi";

const ENSNotFound: FC = () => {
  const { colorMode } = useContext(AppContext);
  const { address } = useAccount();

  return (
    <Modal w="456px" h="520px" isOpen clickThrough onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <VStack mt="24px" spacing="24px">
        <Image src="/icons/ens.png" width="128px" height="128px" quality={100} />
        <VStack spacing="8px">
          <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
            ENS not found
          </Text>
          <Text color="grey.500" textStyle="paragraph-1">
            Get your ENS to get your land.
          </Text>
        </VStack>
        <VStack
          p="24px"
          spacing="24px"
          w="408px"
          h="176px"
          borderRadius="12px"
          align="flex-start"
          bgColor={colorMode === "light" ? "white" : "dark.grey800"}
        >
          <VStack spacing="8px" align="flex-start">
            <Text textStyle="paragraph-2" color="grey.500">
              If you want to choose your ENS name
            </Text>
            <Link color="primary.500" textStyle="button-2" _focusVisible={{ boxShadow: "none" }} href={HOWTOPLAY_URL} isExternal>
              How to get a new ENS on Goerli
            </Link>
          </VStack>
          <VStack spacing="8px" align="flex-start">
            <Text textStyle="paragraph-2" color="grey.500">
              If you want to get ENS quickly
            </Text>
            <Button
              w="154px"
              h="32px"
              color="purple"
              borderRadius="8px"
              onClick={() => {
                if (!address) return;
                createPhiSubdomain(address);
              }}
            >
              <Text textStyle="button-2" color={colorMode === "light" ? "white" : "grey.900"}>
                Get ENS quickly
              </Text>
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default ENSNotFound;
