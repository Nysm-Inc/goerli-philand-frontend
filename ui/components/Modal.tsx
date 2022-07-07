import { FC, ReactNode, useContext, useRef } from "react";
import {
  Modal as ChakraModal,
  ModalBody as ChakraModalBody,
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalFooter as ChakraModalFooter,
  Text,
  Box,
  VStack,
  LayoutProps,
  HStack,
  useDimensions,
  PositionProps,
  Flex,
} from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Button from "./Button";

const Line: FC = () => {
  const { colorMode } = useContext(AppContext);
  return <Box w="full" height="2px" bgColor={colorMode === "light" ? "#CECCC9" : "#808080"} transform="matrix(1, 0, 0, -1, 0, 0)" />;
};
const LineStack: FC<{ w?: LayoutProps["w"] }> = ({ w }) => (
  <VStack w={w || "full"} spacing="3px">
    <Line />
    <Line />
    <Line />
  </VStack>
);

const ModalHeader: FC<{ title?: string; buttons: JSX.Element[] }> = ({ title, buttons }) => {
  const ref = useRef(null);
  const dimensions = useDimensions(ref);
  const titleW = dimensions?.borderBox.width || 0;

  return (
    <ChakraModalHeader pr="0" pl="0" mb="24px">
      <HStack height="32px" align="center">
        {title ? (
          <>
            <LineStack w={`calc(50% - ${titleW / 2}px)`} />
            <Text ref={ref} color="white" textStyle="headline">
              {title}
            </Text>
            <HStack flexGrow={1} height="32px" align="center">
              <LineStack />
              {buttons.map((button) => button)}
            </HStack>
          </>
        ) : (
          <>
            <LineStack />
            {buttons.map((button) => button)}
          </>
        )}
      </HStack>
    </ChakraModalHeader>
  );
};

const ModalBody: FC<{ children: ReactNode }> = ({ children }) => {
  const { colorMode } = useContext(AppContext);
  return (
    <ChakraModalBody borderRadius="16px" p="0px" bgColor={colorMode === "light" ? "#FBF9F5" : "#0D0D0D"}>
      {children}
    </ChakraModalBody>
  );
};

const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraModalFooter justifyContent="center">{children}</ChakraModalFooter>;
};

const ModalFooterButton: FC<{ text: string; buttonText: string; onClick: () => void }> = ({ text, buttonText, onClick }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Flex w="730px" h="64px" p="12px 16px 12px 24px" bgColor="#1A1A1A" borderRadius="16px" justify="space-between" align="center">
      <Text textStyle="headline-2" color={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"}>
        {text}
      </Text>
      <Button w="90px" h="40px" onClick={onClick}>
        {buttonText}
      </Button>
    </Flex>
  );
};

const Modal: FC<{
  w: LayoutProps["w"];
  h: LayoutProps["h"];
  left?: PositionProps["left"];
  isOpen: boolean;
  onClose: () => void;
  onCloseComplete?: () => void;
  children: ReactNode;
}> = ({ w, h, isOpen, left, onClose, onCloseComplete, children }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered={!!left || true} scrollBehavior="inside" onCloseComplete={onCloseComplete}>
      <ChakraModalContent
        p="24px"
        border="1px solid"
        borderColor={colorMode === "light" ? "#F5F2EB" : "#1A1A1A"}
        borderRadius="40px"
        boxShadow="0px 8px 16px rgba(13, 13, 13, 0.1)"
        bgColor={colorMode === "light" ? "#FBF9F5" : "#0D0D0D"}
        minW={w}
        minH={h}
        maxW={w}
        maxH={h}
        position={left ? "absolute" : "static"}
        left={left}
      >
        {children}
      </ChakraModalContent>
    </ChakraModal>
  );
};

export { Modal, ModalBody, ModalHeader, ModalFooter, ModalFooterButton };
