import { FC, useContext } from "react";
import { Center, forwardRef, IconButton as ChakraIconButton } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { Spinner } from "./Animation";

const IconButton: FC<{
  ariaLabel: string;
  icon: JSX.Element;
  size?: 32 | 48;
  borderRadius?: 8 | 12;
  outline?: boolean;
  boxShadow?: boolean;
  flipColor?: boolean;
  isLoading?: boolean;
  onClick: () => void;
}> = forwardRef(
  ({ ariaLabel, icon, size = 48, borderRadius = 12, boxShadow = true, outline = true, flipColor, isLoading, onClick }, ref) => {
    const { colorMode } = useContext(AppContext);
    const _colorMode = colorMode === (flipColor ? "dark" : "light");

    return (
      <ChakraIconButton
        //
        variant="unstyled"
        _focus={{ outline: "none" }}
        _focusVisible={{ outline: "none" }}
        //
        minW={`${size}px`}
        minH={`${size}px`}
        maxW={`${size}px`}
        maxH={`${size}px`}
        borderRadius={`${borderRadius}px`}
        boxShadow={boxShadow ? "-2px 4px 8px rgba(13, 13, 13, 0.1)" : ""}
        //
        ref={ref}
        aria-label={ariaLabel}
        onClick={onClick}
        //
        border={outline ? "1px solid" : "none"}
        bgColor={_colorMode ? "white" : "#1A1A1A"}
        borderColor={_colorMode ? "#CECCC9" : "none"}
        _hover={{
          bgColor: _colorMode ? "#F5F2EB" : "#333333",
          border: "1px solid",
          borderColor: _colorMode ? "#1A1A1A" : "#808080",
        }}
        _active={{
          bgColor: _colorMode ? "white" : "#333333",
          border: "1px solid",
          borderColor: _colorMode ? "#1A1A1A" : "#808080",
        }}
      >
        <Center>{isLoading ? <Spinner /> : <>{icon}</>}</Center>
      </ChakraIconButton>
    );
  }
);

export default IconButton;
