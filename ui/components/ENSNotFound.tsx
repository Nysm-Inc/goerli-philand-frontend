import Image from "next/image";
import { FC, useContext } from "react";
import { Link, Text, useBoolean, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";
import IconButton from "./common/IconButton";
import { Modal, ModalHeader } from "./common/Modal";

const ENSNotFound: FC = () => {
  const { colorMode } = useContext(AppContext);
  const [isOpen, { off: onClose }] = useBoolean(true);

  return (
    <Modal w="456px" h="400px" isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        buttons={[
          <IconButton
            key="close"
            ariaLabel="close"
            icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
            size="32px"
            borderRadius="8px"
            boxShadow={false}
            onClick={onClose}
          />,
        ]}
      />
      <VStack mt="24px" spacing="32px">
        <Image src="/icons/ens.svg" width="128px" height="128px" priority />
        <VStack spacing="8px">
          <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
            ENS Not Found
          </Text>
          <Text color="grey.500" textStyle="paragraph-1">
            Get your ENS to get your land.
          </Text>
        </VStack>
        <Link color="primary.500" textStyle="button-2" href="https://app.ens.domains/" isExternal>
          Get a new ENS on Goerli
        </Link>
      </VStack>
    </Modal>
  );
};

export default ENSNotFound;
