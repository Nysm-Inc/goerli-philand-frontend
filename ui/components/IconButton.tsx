import { FC, useContext } from "react";
import { Center, LayoutProps, forwardRef, IconButton as ChakraIconButton, SystemProps } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { Spinner } from "./Animation";

const IconButton: FC<{
  ariaLabel: string;
  icon: JSX.Element;
  size?: LayoutProps["w"];
  borderRadius?: SystemProps["borderRadius"];
  outline?: boolean;
  boxShadow?: boolean;
  flipColor?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  onClick: () => void;
}> = forwardRef(
  (
    { ariaLabel, icon, size = "48px", borderRadius = "12px", boxShadow = true, outline = true, flipColor, isLoading, isActive, onClick },
    ref
  ) => {
    const { colorMode } = useContext(AppContext);
    const _colorMode = colorMode === (flipColor ? "dark" : "light");

    return (
      <ChakraIconButton
        variant="unstyled"
        _focus={{ outline: "none" }}
        _focusVisible={{ outline: "none" }}
        //
        minW={size}
        minH={size}
        maxW={size}
        maxH={size}
        borderRadius={borderRadius}
        boxShadow={boxShadow ? "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);" : ""}
        ref={ref}
        aria-label={ariaLabel}
        isActive={isActive}
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
        _active={
          isActive
            ? {
                bgColor: _colorMode ? "light.lg_orange40" : "dark.grey700",
                border: "1px solid",
                borderColor: _colorMode ? "light.g_orange" : "dark.grey700",
              }
            : {
                bgColor: _colorMode ? "white" : "dark.grey700",
                border: "1px solid",
                borderColor: _colorMode ? "grey.900" : "grey.500",
              }
        }
      >
        <Center>{isLoading ? <Spinner mode={colorMode} /> : <>{icon}</>}</Center>
      </ChakraIconButton>
    );
  }
);

export default IconButton;
