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
} from "@chakra-ui/react";
import { AppContext } from "~/contexts";

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
    <ChakraModalBody bgColor={colorMode === "light" ? "#FFFFFF" : "#1A1A1A"} borderRadius="16px">
      {children}
    </ChakraModalBody>
  );
};
const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraModalFooter>{children}</ChakraModalFooter>;
};

const Modal: FC<{ w: LayoutProps["w"]; h: LayoutProps["h"]; isOpen: boolean; onClose: () => void; children: ReactNode }> = ({
  w,
  h,
  isOpen,
  onClose,
  children,
}) => {
  const { colorMode } = useContext(AppContext);

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
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
      >
        {children}
      </ChakraModalContent>
    </ChakraModal>
  );
};

export { Modal, ModalBody, ModalHeader, ModalFooter };
