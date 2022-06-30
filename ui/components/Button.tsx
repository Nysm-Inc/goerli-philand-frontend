import { FC, ReactNode, useContext } from "react";
import { Button as ChakraButton, LayoutProps, Flex, forwardRef, Center } from "@chakra-ui/react";
import { themeColors } from "~/ui/styles";
import { AppContext } from "~/contexts";

const Button: FC<{
  w: LayoutProps["w"];
  color?: keyof typeof themeColors;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
  // justify?: SystemProps["justifyContent"];
  onClick?: () => void;
  children?: ReactNode;
}> = forwardRef((props, ref) => {
  const { w, color, leftIcon, rightIcon, disabled, onClick, children } = props;
  const { colorMode } = useContext(AppContext);
  return (
    <ChakraButton
      variant="unstyled"
      _focusVisible={{ outline: "none" }}
      //
      h="48px"
      p="8px"
      boxShadow="-2px 4px 8px rgba(13, 13, 13, 0.1)"
      borderRadius="12px"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      textStyle="button-2"
      //
      ref={ref}
      w={w}
      disabled={disabled}
      onClick={onClick}
      {...(color
        ? {
            bgColor: `${color}.150`,
            _hover: {
              bgColor: `${color}.250`,
            },
            _active: {
              bgColor: `${color}.250`,
            },
            _focus: {
              bgColor: `${color}.150`,
              border: "2px solid",
              borderColor: `${color}.250`,
            },
          }
        : {
            textColor: colorMode === "light" ? "#1A1A1A" : "white",
            bgColor: colorMode === "light" ? "white" : "#333333",
            border: colorMode === "light" ? "1px solid" : "none",
            borderColor: colorMode === "light" ? "#CECCC9" : "none",
            _hover: {
              "&:not([disabled])": {
                bgColor: colorMode === "light" ? "#F5F2EB" : "#333333",
                borderColor: colorMode === "light" ? "#1A1A1A" : "#808080",
              },
            },
            _active: {
              bgColor: colorMode === "light" ? "white" : "#333333",
              borderColor: colorMode === "light" ? "#1A1A1A" : "#808080",
            },
            // _disabled: {},
            _focus: { outline: "none" },
          })}
    >
      <Flex justify="space-evenly">
        <Center>{leftIcon}</Center>
        {children}
        <Center>{rightIcon}</Center>
      </Flex>
    </ChakraButton>
  );
});

export default Button;
