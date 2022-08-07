import Image from "next/image";
import { FC, useContext, useEffect } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { HOW_IT_WORKS_KEY } from "~/constants";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { Modal, ModalHeader, ModalBody } from "./Modal";

const HowItWorks: FC<{ isOpen: boolean; onOpen: () => void; onClose: () => void }> = ({ isOpen, onOpen, onClose }) => {
  const { colorMode } = useContext(AppContext);

  useEffect(() => {
    const onlyOnce = localStorage.getItem(HOW_IT_WORKS_KEY);
    if (!onlyOnce) {
      onOpen();
      localStorage.setItem(HOW_IT_WORKS_KEY, "true");
    }
  }, []);

  return (
    <Modal w="864px" h="712px" isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="How It Works"
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
      <Box h="16px" />
      <ModalBody>
        <VStack
          h="592px"
          p="24px"
          spacing="16px"
          align="flex-start"
          borderRadius="16px"
          bgColor={colorMode === "light" ? "white" : "grey.900"}
        >
          <Image src={`/assets/howItWorks_${colorMode}.png`} width="800px" height="400px" />
          <Text w="711px" textStyle="paragraph-1" color="grey.500">
            To place an object on land, you must obtain it from a store or quest and deposit it from your wallet into your land.
          </Text>
          <Text w="711px" textStyle="paragraph-1" color="grey.500">
            Objects deposited in Land can be placed on Land by drag-and-drop.
          </Text>
        </VStack>
      </ModalBody>
    </Modal>
  );
};

export default HowItWorks;
