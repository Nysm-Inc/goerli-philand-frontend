import { FC, useContext } from "react";
import { Box, Center, LayoutProps, MenuItem, MenuList as ChakraMenuList, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";

export type Option = {
  label: string;
  value: string;
  onClick?: () => void;
};

const MenuList: FC<{ w: LayoutProps["w"]; isOpen: boolean; value?: string; options: Option[]; onClick?: (v: string) => void }> = ({
  w,
  isOpen,
  value,
  options,
  onClick,
}) => {
  const { colorMode } = useContext(AppContext);

  return (
    <>
      {isOpen && (
        <ChakraMenuList
          maxHeight="240px"
          boxShadow="-2px 4px 8px rgba(13, 13, 13, 0.1)"
          borderRadius="12px"
          p="8px"
          overflowY="scroll"
          minW="0"
          w={w}
          //
          border={colorMode === "light" ? "1px solid" : "none"}
          borderColor="light.g_orange"
          bgColor={colorMode === "light" ? "white" : "grey.900"}
        >
          {options.map((item, i) => (
            <MenuItem
              //
              key={i}
              w="100%"
              h="32px"
              p="8px"
              textAlign="left"
              borderRadius="6px"
              onClick={() => {
                if (item.onClick) item.onClick();
                else if (onClick) onClick(item.value);
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
                textColor={colorMode === "light" ? "grey.900" : "white"}
                w="calc(100% - 16px)"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {item.label}
              </Text>
              <Box w="8px" />
              <Center w="24px">{value === item.value && <Icon name="check" color={colorMode === "light" ? "grey.900" : "white"} />}</Center>
            </MenuItem>
          ))}
        </ChakraMenuList>
      )}
    </>
  );
};

export default MenuList;
