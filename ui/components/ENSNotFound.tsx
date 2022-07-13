import Image from "next/image";
import { FC, useContext } from "react";
import { Box, Text, useBoolean, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { Modal, ModalHeader } from "./Modal";

const ENSNotFound: FC = () => {
  const { colorMode } = useContext(AppContext);
  const [isOpen, { off: onClose }] = useBoolean(true);

  return (
    <Modal w="456px" h="438px" isOpen={isOpen} onClose={() => {}}>
      <ModalHeader
        buttons={[
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            size={32}
            borderRadius={8}
            boxShadow={false}
            onClick={onClose}
          />,
        ]}
      />
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
