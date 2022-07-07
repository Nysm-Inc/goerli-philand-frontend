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
      textColor={colorMode === "light" ? "#1A1A1A" : "white"}
      border={colorMode === "light" ? "1px solid" : "none"}
      bgColor={colorMode === "light" ? "white" : "#1A1A1A"}
      borderColor={colorMode === "light" ? "#CECCC9" : "none"}
      _hover={{
        bgColor: colorMode === "light" ? "#F5F2EB" : "#333333",
        borderColor: colorMode === "light" ? "#1A1A1A" : "#808080",
      }}
      _active={{
        bgColor: colorMode === "light" ? "white" : "#333333",
        borderColor: colorMode === "light" ? "#1A1A1A" : "#808080",
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
        _placeholder={{ color: "#808080" }}
        //
        pl={leftIcon ? "48px" : "12px"}
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
