import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useContext } from "react";
import { AppContext } from "~/contexts";
import { Modal, ModalHeader } from "./Modal";

const ENSNotFound: FC = () => {
  const { colorMode } = useContext(AppContext);

  return (
    <Modal w="456px" h="438px" isOpen={true} onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <VStack spacing="8px">
        <Image src="/icons/ens.svg" width="134px" height="150px" />
        <Box h="16px" />
        <Text color="white" textStyle="headline">
          ENS NOT FOUND
        </Text>
        <Text color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} textStyle="paragraph-1">
          Get your ENS to get your land.
        </Text>
      </VStack>
    </Modal>
  );
};

export default ENSNotFound;
