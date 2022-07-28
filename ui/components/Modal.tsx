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
  ModalOverlay,
  ModalHeaderProps,
  Center,
} from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Button from "./Button";
import Icon from "./Icon";

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
    <ChakraModalHeader {...style} p="0">
      <HStack h={title ? "48px" : "32px"} align="center" spacing="16px">
        {title ? (
          <>
            {back}
            <LineStack w={`calc(50% - ${titleW / 2}px - 8px - ${back ? "40" : "0"}px)`} />
            <Text ref={ref} color="white" textStyle="headline">
              {title}
            </Text>
            <HStack flexGrow={1} h="32px" align="center" spacing="16px">
              <LineStack />
              <HStack spacing="8px">{buttons.map((button) => button)}</HStack>
            </HStack>
          </>
        ) : (
          <>
            <LineStack />
            <HStack spacing="8px">{buttons.map((button) => button)}</HStack>
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

const ModalFooterButton: FC<{
  text: string;
  itemNum: number;
  buttonW?: "full" | "512px";
  subText: string;
  isLoading?: boolean;
  onClick: () => void;
}> = ({ text, itemNum, buttonW = "512px", subText, isLoading, onClick }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <VStack
      w="full"
      h="120px"
      p="16px 24px"
      borderRadius="32px"
      border="1px solid"
      spacing="16px"
      borderColor={colorMode === "light" ? "light.g_orange" : "dark.grey800"}
      bgColor={colorMode === "light" ? "white" : "dark.black"}
    >
      <Button
        w={buttonW}
        h="56px"
        color="purple"
        justify="space-between"
        borderRadius="16px"
        isLoading={isLoading}
        onClick={onClick}
        leftIcon={
          <Text pl="12px" textStyle="button-1" color="white">
            {text}
          </Text>
        }
        rightIcon={
          <Center minW="50px" h="32px" p="8px 12px" gap="8px" bgColor="rgba(13, 13, 13, 0.32)" borderRadius="8px">
            <Icon name="bag" color="white" />
            <Text textStyle="headline-2" color="white">
              {itemNum}
            </Text>
          </Center>
        }
      />
      <Text textStyle="paragraph-3" color="grey.500">
        {subText}
      </Text>
    </VStack>
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
        borderRadius="32px"
        boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25)"
        border="1px solid"
        borderColor={colorMode === "light" ? "light.g_orange" : "grey.900"}
        bgColor={colorMode === "light" ? "light.lg_orange30" : "dark.black"}
        minW={w}
        minH={h}
        maxW={w}
        maxH={h}
        position={left ? "absolute" : "relative"}
        left={left}
      >
        {children}
      </ChakraModalContent>
    </ChakraModal>
  );
};

export { Modal, ModalBody, ModalHeader, ModalFooter, ModalFooterButton };
