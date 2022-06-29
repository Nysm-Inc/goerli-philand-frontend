import { FC, useContext } from "react";
import { Center, IconButton as ChakraIconButton } from "@chakra-ui/react";
import { AppContext } from "~/contexts";

const IconButton: FC<{ ariaLabel: string; icon: JSX.Element; outline?: boolean; boxShadow?: boolean; onClick: () => void }> = ({
  ariaLabel,
  icon,
  boxShadow = true,
  outline = true,
  onClick,
}) => {
  const { colorMode } = useContext(AppContext);
  return (
    <ChakraIconButton
      //
      variant="unstyled"
      _focus={{ outline: "none" }}
      _focusVisible={{ outline: "none" }}
      //
      w="48px"
      h="48px"
      borderRadius="12px"
      boxShadow={boxShadow ? "-2px 4px 8px rgba(13, 13, 13, 0.1)" : ""}
      //
      aria-label={ariaLabel}
      onClick={onClick}
      //
      border={outline ? "1px solid" : "none"}
      bgColor={colorMode === "light" ? "white" : "#1A1A1A"}
      borderColor={colorMode === "light" ? "#CECCC9" : "none"}
      _hover={{
        bgColor: colorMode === "light" ? "#F5F2EB" : "#333333",
        border: "1px solid",
        borderColor: colorMode === "light" ? "#1A1A1A" : "#808080",
      }}
      _active={{
        bgColor: colorMode === "light" ? "white" : "#333333",
        border: "1px solid",
        borderColor: colorMode === "light" ? "#1A1A1A" : "#808080",
      }}
    >
      <Center>{icon}</Center>
    </ChakraIconButton>
  );
};

export default IconButton;
