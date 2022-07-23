import { FC, ReactNode, useContext } from "react";
import { Button as ChakraButton, LayoutProps, Flex, forwardRef, Center } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { subColors } from "~/ui/styles/color";
import { Spinner } from "./Animation";

const Button: FC<{
  w: LayoutProps["w"];
  h?: LayoutProps["h"];
  color?: keyof typeof subColors;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}> = forwardRef((props, ref) => {
  const { w, h = "48px", color, leftIcon, rightIcon, disabled, isLoading, onClick, children } = props;
  const { colorMode } = useContext(AppContext);
  return (
    <ChakraButton
      variant="unstyled"
      _focusVisible={{ outline: "none" }}
      //
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
      h={h}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...(color
        ? {
            bgColor: `${color}.250`,
            _hover: {
              "&:not([disabled])": {
                bgColor: `${color}.350`,
              },
            },
            _active: {
              "&:not([disabled])": {
                bgColor: `${color}.350`,
              },
            },
            _focus: {
              "&:not([disabled])": {
                bgColor: `${color}.250`,
                border: "2px solid",
                borderColor: `${color}.350`,
              },
            },
            _disabled: !isLoading
              ? {
                  bgColor: colorMode === "light" ? "grey.200" : "dark.grey800",
                  cursor: "not-allowed",
                }
              : {
                  cursor: "not-allowed",
                },
          }
        : {
            textColor: colorMode === "light" ? "grey.900" : "white",
            bgColor: colorMode === "light" ? "white" : "grey.900",
            border: colorMode === "light" ? "1px solid" : "none",
            borderColor: colorMode === "light" ? "light.g_orange" : "dark.grey700",
            _hover: {
              "&:not([disabled])": {
                bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700",
                borderColor: colorMode === "light" ? "grey.900" : "grey.500",
              },
            },
            _active: {
              "&:not([disabled])": {
                bgColor: colorMode === "light" ? "white" : "dark.grey700",
                borderColor: colorMode === "light" ? "grey.900" : "grey.500",
              },
            },
            _focus: {
              outline: "none",
            },
            _disabled: !isLoading
              ? {
                  bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey800",
                  borderColor: "light.g_orange",
                  cursor: "not-allowed",
                }
              : {
                  cursor: "not-allowed",
                },
          })}
    >
      <Flex justify="space-evenly" align="center">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Center>{leftIcon}</Center>
            {children}
            <Center>{rightIcon}</Center>
          </>
        )}
      </Flex>
    </ChakraButton>
  );
});

export default Button;
