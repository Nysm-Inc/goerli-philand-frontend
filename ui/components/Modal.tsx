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
  ModalOverlay,
  ModalHeaderProps,
} from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Button from "./Button";

const Line: FC = () => {
  const { colorMode } = useContext(AppContext);
  return (
    <Box w="full" height="2px" bgColor={colorMode === "light" ? "light.g_orange" : "grey.500"} transform="matrix(1, 0, 0, -1, 0, 0)" />
  );
};
const LineStack: FC<{ w?: LayoutProps["w"] }> = ({ w }) => (
  <VStack w={w || "full"} spacing="3px">
    <Line />
    <Line />
    <Line />
  </VStack>
);

const ModalHeader: FC<{ title?: string; buttons: JSX.Element[]; back?: JSX.Element; style?: ModalHeaderProps }> = ({
  title,
  buttons,
  back,
  style,
}) => {
  const ref = useRef(null);
  const dimensions = useDimensions(ref);
  const titleW = dimensions?.borderBox.width || 0;

  return (
    <ChakraModalHeader {...style} pr="0" pl="0">
      <HStack height="32px" align="center">
        {title ? (
          <>
            {back}
            <LineStack w={`calc(50% - ${titleW / 2}px - 8px - ${back ? "40" : "0"}px)`} />
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
    <ChakraModalBody borderRadius="16px" p="0px" bgColor={colorMode === "light" ? "light.lg_orange30" : "dark.black"}>
      {children}
    </ChakraModalBody>
  );
};

const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraModalFooter justifyContent="center">{children}</ChakraModalFooter>;
};

const ModalFooterButton: FC<{ text: string; buttonText: string; isLoading?: boolean; onClick: () => void }> = ({
  text,
  buttonText,
  isLoading,
  onClick,
}) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Flex
      w="730px"
      h="64px"
      p="12px 16px 12px 24px"
      borderRadius="16px"
      justify="space-between"
      align="center"
      bgColor={colorMode === "light" ? "grey.900" : "white"}
    >
      <Text textStyle="headline-2" color={colorMode === "light" ? "white" : "grey.900"}>
        {text}
      </Text>
      <Button w="90px" h="40px" isLoading={isLoading} onClick={onClick}>
        {buttonText}
      </Button>
    </Flex>
  );
};

const Modal: FC<{
  w: LayoutProps["w"];
  h: LayoutProps["h"];
  left?: PositionProps["left"];
  overlay?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onCloseComplete?: () => void;
  children: ReactNode;
}> = ({ w, h, isOpen, left, overlay, onClose, onCloseComplete, children }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered={!!left || true} scrollBehavior="inside" onCloseComplete={onCloseComplete}>
      {overlay && <ModalOverlay bgColor="rgba(26, 26, 26, 0.32)" />}
      <ChakraModalContent
        p="24px"
        border="1px solid"
        borderColor={colorMode === "light" ? "light.lg_orange40" : "grey.900"}
        borderRadius="40px"
        boxShadow="0px 8px 16px rgba(13, 13, 13, 0.1)"
        bgColor={colorMode === "light" ? "light.lg_orange30" : "dark.black"}
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
