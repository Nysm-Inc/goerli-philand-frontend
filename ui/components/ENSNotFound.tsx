import Image from "next/image";
import { FC, useContext } from "react";
import { Link, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { HOWTOPLAY_URL } from "~/constants";
import { Modal, ModalHeader } from "./common/Modal";

const ENSNotFound: FC = () => {
  const { colorMode } = useContext(AppContext);

  return (
    <Modal w="456px" h="400px" isOpen clickThrough onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <VStack mt="24px" spacing="32px">
        <Image src="/icons/ens.png" width="128px" height="128px" quality={100} />
        <VStack spacing="8px">
          <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
            ENS Not Found
          </Text>
          <Text color="grey.500" textStyle="paragraph-1">
            Get your ENS to get your land.
          </Text>
        </VStack>
        <Link color="primary.500" textStyle="button-2" _focusVisible={{ boxShadow: "none" }} href={HOWTOPLAY_URL} isExternal>
          How to get a new ENS on Goerli
        </Link>
      </VStack>
    </Modal>
  );
};

export default ENSNotFound;
