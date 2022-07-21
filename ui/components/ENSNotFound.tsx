import Image from "next/image";
import { FC, useContext } from "react";
import { Box, Link, Text, useBoolean, VStack } from "@chakra-ui/react";
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
      <VStack spacing="32px">
        <Image src="/icons/ens.svg" width="134px" height="150px" />
        <VStack spacing="8px">
          <Text textStyle="headline-1" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"}>
            ENS NOT FOUND
          </Text>
          <Text color="#808080" textStyle="paragraph-1">
            Get your ENS to get your land.
          </Text>
        </VStack>
        <Link color="#8080FF" textStyle="button-2" href="https://app.ens.domains/" isExternal>
          Get a new ENS on Goerli
        </Link>
      </VStack>
    </Modal>
  );
};

export default ENSNotFound;
