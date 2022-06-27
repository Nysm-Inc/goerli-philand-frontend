import { ChangeEventHandler, FC, ReactNode, useContext } from "react";
import { InputGroup, Input as ChakraInput, InputLeftElement, InputRightElement, LayoutProps } from "@chakra-ui/react";
import { AppContext } from "~/contexts";

const Input: FC<{
  w: LayoutProps["w"];
  placeholder: string;
  value: string | number;
  leftIcon: ReactNode;
  rightIcon: JSX.Element;
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
      textColor={colorMode.mode === "light" ? "#1A1A1A" : "white"}
      border={colorMode.mode === "light" ? "1px solid" : "none"}
      bgColor={colorMode.mode === "light" ? "white" : "#1A1A1A"}
      borderColor={colorMode.mode === "light" ? "#CECCC9" : "none"}
      _hover={{
        bgColor: colorMode.mode === "light" ? "#F5F2EB" : "#333333",
        borderColor: colorMode.mode === "light" ? "#1A1A1A" : "#808080",
      }}
      _active={{
        bgColor: colorMode.mode === "light" ? "white" : "#333333",
        borderColor: colorMode.mode === "light" ? "#1A1A1A" : "#808080",
      }}
    >
      <InputLeftElement inlineSize="48px" h="100%">
        {leftIcon}
      </InputLeftElement>
      <ChakraInput
        //
        variant="unstyled"
        _placeholder={{ color: "#808080" }}
        //
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <InputRightElement inlineSize="48px" h="100%">
        {rightIcon}
      </InputRightElement>
    </InputGroup>
  );
};

export default Input;
