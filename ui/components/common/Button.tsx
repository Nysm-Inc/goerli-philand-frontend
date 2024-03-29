import { FC, MouseEventHandler, ReactNode, useContext } from "react";
import { Button as ChakraButton, LayoutProps, Flex, forwardRef, Center, SystemProps, SpaceProps } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { subColors } from "~/ui/styles/color";
import { Spinner } from "~/ui/components/Animation";

const Button: FC<{
  w: LayoutProps["w"];
  h?: LayoutProps["h"];
  p?: SpaceProps["p"];
  color?: keyof typeof subColors;
  shadow?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  justify?: SystemProps["justifyContent"];
  borderRadius?: SystemProps["borderRadius"];
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}> = forwardRef((props, ref) => {
  const {
    w,
    h = "48px",
    p = "8px 12px",
    color,
    shadow,
    leftIcon,
    rightIcon,
    justify = "space-evenly",
    borderRadius = "12px",
    disabled,
    isLoading,
    onClick,
    children,
  } = props;
  const { colorMode } = useContext(AppContext);

  return (
    <ChakraButton
      variant="unstyled"
      _focusVisible={{ outline: "none" }}
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      ref={ref}
      w={w}
      minH={h}
      maxH={h}
      p={p}
      borderRadius={borderRadius}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...(shadow && { boxShadow: "md" })}
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
              : { cursor: "not-allowed" },
          }
        : {
            bgColor: colorMode === "light" ? "white" : "grey.900",
            border: "1px solid",
            borderColor: colorMode === "light" ? "light.g_orange" : "dark.grey800",
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
            _focus: {},
            _disabled: !isLoading
              ? {
                  bgColor: colorMode === "light" ? "white" : "grey.900",
                  borderColor: colorMode === "light" ? "light.g_orange" : "dark.grey700",
                  cursor: "not-allowed",
                }
              : { cursor: "not-allowed" },
          })}
    >
      <Flex justify={isLoading ? "center" : justify} align="center">
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
