import { FC, useContext } from "react";
import { Center, forwardRef, IconButton as ChakraIconButton } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { Spinner } from "./Animation";

const IconButton: FC<{
  ariaLabel: string;
  icon: JSX.Element;
  size?: 32 | 40 | 48 | 76;
  borderRadius?: 8 | 12 | 20;
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
        variant="unstyled"
        _focus={{ outline: "none" }}
        _focusVisible={{ outline: "none" }}
        //
        minW={`${size}px`}
        minH={`${size}px`}
        maxW={`${size}px`}
        maxH={`${size}px`}
        borderRadius={`${borderRadius}px`}
        boxShadow={boxShadow ? "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);" : ""}
        //
        ref={ref}
        aria-label={ariaLabel}
        onClick={onClick}
        //
        bgColor={_colorMode ? "white" : "grey.900"}
        border={outline ? "1px solid" : "none"}
        borderColor={_colorMode ? "light.g_orange" : "dark.grey800"}
        _hover={{
          bgColor: _colorMode ? "light.lg_orange40" : "dark.grey700",
          border: "1px solid",
          borderColor: _colorMode ? "grey.900" : "grey.500",
        }}
        _active={{
          bgColor: _colorMode ? "white" : "dark.grey700",
          border: "1px solid",
          borderColor: _colorMode ? "grey.900" : "grey.500",
        }}
      >
        <Center>{isLoading ? <Spinner /> : <>{icon}</>}</Center>
      </ChakraIconButton>
    );
  }
);

export default IconButton;
