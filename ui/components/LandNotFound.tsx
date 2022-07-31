import Image from "next/image";
import { FC, useContext, useEffect } from "react";
import { Text, LayoutProps, useDisclosure, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { Modal, ModalHeader } from "./Modal";

const LandNotFound: FC<{ isOpen: boolean; w?: LayoutProps["w"]; h?: LayoutProps["h"] }> = ({ isOpen: originIsOpen, w, h }) => {
  const { colorMode } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (originIsOpen) onOpen();
  }, [originIsOpen]);

  return (
    <Modal w={w || "400px"} h={h || "320px"} isOpen={isOpen} onClose={onClose}>
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
        <Image src="/icons/ens.svg" width="128px" height="128px" />

        <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
          Land Not Found
        </Text>
      </VStack>
    </Modal>
  );
};

export default LandNotFound;
