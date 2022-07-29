import { ChangeEventHandler, FC, ReactNode, useContext } from "react";
import { InputGroup, Input as ChakraInput, InputLeftElement, InputRightElement, LayoutProps } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { typographys } from "~/ui/styles/typography";

const Input: FC<{
  w: LayoutProps["w"];
  placeholder: string;
  value: string | number;
  leftIcon?: ReactNode;
  rightIcon?: JSX.Element;
  shadow?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ w, placeholder, value, leftIcon, rightIcon, shadow = true, onChange }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <InputGroup
      h="48px"
      borderRadius="12px"
      boxShadow={shadow ? "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);" : ""}
      w={w}
      //
      border="1px solid"
      bgColor={colorMode === "light" ? "white" : "grey.900"}
      borderColor={colorMode === "light" ? "light.g_orange" : "dark.grey800"}
      _hover={{
        bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700",
        borderColor: colorMode === "light" ? "grey.900" : "grey.500",
      }}
      _active={{
        bgColor: colorMode === "light" ? "white" : "dark.grey700",
        borderColor: colorMode === "light" ? "grey.900" : "grey.500",
      }}
    >
      {leftIcon && (
        <InputLeftElement inlineSize="48px" h="100%">
          {leftIcon}
        </InputLeftElement>
      )}
      <ChakraInput
        variant="unstyled"
        textStyle="paragraph-2"
        borderRadius="12px"
        style={{ fontSize: typographys["paragraph-2"].fontSize }}
        color={colorMode === "light" ? "grey.900" : "white"}
        _placeholder={{ color: "grey.500", textStyle: "button-2" }}
        pl={leftIcon ? "40px" : "12px"}
        pr={rightIcon ? "48px" : "12px"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {rightIcon && (
        <InputRightElement inlineSize="48px" h="100%" pr="16px">
          {rightIcon}
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default Input;
