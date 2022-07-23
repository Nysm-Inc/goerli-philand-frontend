import { ChangeEventHandler, FC, ReactNode, useContext } from "react";
import { InputGroup, Input as ChakraInput, InputLeftElement, InputRightElement, LayoutProps } from "@chakra-ui/react";
import { AppContext } from "~/contexts";

const Input: FC<{
  w: LayoutProps["w"];
  placeholder: string;
  value: string | number;
  leftIcon?: ReactNode;
  rightIcon?: JSX.Element;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ w, placeholder, value, leftIcon, rightIcon, onChange }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <InputGroup
      h="48px"
      boxShadow="-2px 4px 8px rgba(13, 13, 13, 0.1)"
      borderRadius="12px"
      w={w}
      //
      textColor={colorMode === "light" ? "grey.900" : "white"}
      border={colorMode === "light" ? "1px solid" : "none"}
      bgColor={colorMode === "light" ? "white" : "grey.900"}
      borderColor={colorMode === "light" ? "light.g_orange" : "none"}
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
        //
        variant="unstyled"
        textStyle="label-1"
        _placeholder={{ color: "grey.500" }}
        //
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
