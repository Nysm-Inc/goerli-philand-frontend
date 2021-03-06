import { FC, ReactNode, useContext } from "react";
import { Button as ChakraButton, LayoutProps, Flex, forwardRef, Center } from "@chakra-ui/react";
import { themeColors } from "~/ui/styles";
import { AppContext } from "~/contexts";
import { Spinner } from "./Animation";

const Button: FC<{
  w: LayoutProps["w"];
  h?: LayoutProps["h"];
  color?: keyof typeof themeColors;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  disabled?: boolean;
  isLoading?: boolean;
  // justify?: SystemProps["justifyContent"];
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
                  bgColor: colorMode === "light" ? "#CCCCCC" : "#292929",
                  cursor: "not-allowed",
                }
              : {
                  cursor: "not-allowed",
                },
          }
        : {
            textColor: colorMode === "light" ? "#1A1A1A" : "white",
            bgColor: colorMode === "light" ? "white" : "#1A1A1A",
            border: colorMode === "light" ? "1px solid" : "none",
            borderColor: colorMode === "light" ? "#CECCC9" : "#333333",
            _hover: {
              "&:not([disabled])": {
                bgColor: colorMode === "light" ? "#F5F2EB" : "#333333",
                borderColor: colorMode === "light" ? "#1A1A1A" : "#808080",
              },
            },
            _active: {
              "&:not([disabled])": {
                bgColor: colorMode === "light" ? "white" : "#333333",
                borderColor: colorMode === "light" ? "#1A1A1A" : "#808080",
              },
            },
            _focus: {
              outline: "none",
            },
            _disabled: !isLoading
              ? {
                  bgColor: colorMode === "light" ? "#F5F2EB" : "#292929",
                  borderColor: "#CECCC9",
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
