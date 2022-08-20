import { FC, useContext } from "react";
import { HStack, Modal, ModalContent, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Button from "./common/Button";

const Alert: FC<{ isOpen: boolean; onClose: () => void; onSubmit: () => void }> = ({ isOpen, onClose, onSubmit }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalContent
        w="336px"
        h="208px"
        p="16px"
        borderRadius="28px"
        boxShadow="2xl"
        border="1px solid"
        borderColor={colorMode === "light" ? "light.g_orange" : "grey.900"}
        bgColor={colorMode === "light" ? "light.lg_orange30" : "dark.black"}
      >
        <VStack spacing="8px">
          <VStack p="16px 0" spacing="8px">
            <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
              Discard Changes?
            </Text>
            <Text w="280px" h="48px" textStyle="paragraph-1" color="grey.500" textAlign="center">
              Your edits will be lost without saving
            </Text>
          </VStack>
          <HStack spacing="8px">
            <Button w="148px" onClick={onClose}>
              <Text textStyle="button-2" color={colorMode === "light" ? "grey.900" : "white"}>
                Cancel
              </Text>
            </Button>
            <Button w="148px" color="red" onClick={() => (onSubmit(), onClose())}>
              <Text textStyle="button-2" color={colorMode === "light" ? "white" : "grey.900"}>
                Discard
              </Text>
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default Alert;
