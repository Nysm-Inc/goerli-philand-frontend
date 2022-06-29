import { FC, useContext } from "react";
import { Box, Center, LayoutProps, MenuItem, MenuList as ChakraMenuList, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Image from "next/image";

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
          borderColor="#CECCC9"
          bgColor={colorMode === "light" ? "white" : "#1A1A1A"}
        >
          {options.map((item, i) => (
            <MenuItem
              //
              key={i}
              w="100%"
              h="32px"
              p="8px"
              textAlign="left"
              borderRadius="8px"
              onClick={() => {
                if (item.onClick) item.onClick();
                else if (onClick) onClick(item.value);
              }}
              //
              textColor={colorMode === "light" ? "#1A1A1A" : "white"}
              bgColor={colorMode === "light" ? "white" : "#1A1A1A"}
              _hover={{
                bgColor: colorMode === "light" ? "#F5F2EB" : "#333333",
              }}
              _active={{
                bgColor: colorMode === "light" ? "white" : "#333333",
              }}
              _focus={{
                bgColor: colorMode === "light" ? "white" : "#333333",
              }}
            >
              <Text w="calc(100% - 16px)" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {item.label}
              </Text>
              <Box w="8px" />
              <Center w="24px">{value === item.value && <Image src="/icons/check.svg" width="16px" height="16px" />}</Center>
            </MenuItem>
          ))}
        </ChakraMenuList>
      )}
    </>
  );
};

export default MenuList;
