import { FC, FocusEventHandler, useContext } from "react";
import { Box, Center, ColorProps, LayoutProps, MenuItem, MenuList as ChakraMenuList, Text, useMenuList } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";

export type Option = {
  label: string;
  value: string;
  onClick?: () => void;
  textColor?: ColorProps["textColor"];
};

const MenuList: FC<{
  w: LayoutProps["w"];
  isOpen: boolean;
  value?: string;
  options: Option[];
  onClick?: (v: string) => void;
  onFocus?: FocusEventHandler<HTMLDivElement>;
}> = ({ w, isOpen, value, options, onFocus, onClick }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <>
      {isOpen && (
        <ChakraMenuList
          maxHeight="240px"
          borderRadius="12px"
          p="8px"
          overflowY="scroll"
          boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);"
          minW="0"
          w={w}
          //
          border={colorMode === "light" ? "1px solid" : "none"}
          borderColor="light.g_orange"
          bgColor={colorMode === "light" ? "white" : "grey.900"}
          onFocus={onFocus}
        >
          {options.map((option, i) => (
            <MenuItem
              //
              key={i}
              w="100%"
              h="32px"
              p="8px"
              textAlign="left"
              borderRadius="6px"
              onClick={() => {
                if (option.onClick) option.onClick();
                else if (onClick) onClick(option.value);
              }}
              //
              bgColor={colorMode === "light" ? "white" : "grey.900"}
              _hover={{
                bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700",
              }}
              _active={{
                bgColor: colorMode === "light" ? "white" : "dark.grey700",
              }}
              _focus={{
                bgColor: colorMode === "light" ? "white" : "dark.grey700",
              }}
            >
              <Text
                textStyle="button-2"
                w="calc(100% - 16px)"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                textColor={option.textColor || (colorMode === "light" ? "grey.900" : "white")}
              >
                {option.label}
              </Text>
              <Box w="8px" />
              <Center w="24px">
                {value === option.value && <Icon name="check" color={colorMode === "light" ? "grey.900" : "white"} />}
              </Center>
            </MenuItem>
          ))}
        </ChakraMenuList>
      )}
    </>
  );
};

export default MenuList;
