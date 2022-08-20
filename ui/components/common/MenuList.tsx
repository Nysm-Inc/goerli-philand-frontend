import Image from "next/image";
import { FC, Fragment, useContext } from "react";
import { Box, Center, ColorProps, LayoutProps, MenuItem, MenuList as ChakraMenuList, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";

export type Option = {
  label: string;
  value: string;
  onClick?: () => void;
  textColor?: ColorProps["textColor"];
  image?: string;
  divider?: boolean;
};

const MenuList: FC<{
  w: LayoutProps["w"];
  maxH?: LayoutProps["maxH"];
  value?: string;
  options: Option[];
  onClick?: (v: string) => void;
}> = ({ w, maxH, value, options, onClick }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <>
      <ChakraMenuList
        maxHeight="240px"
        borderRadius="12px"
        p="8px"
        overflowY="scroll"
        boxShadow="md"
        minW="0"
        w={w}
        maxH={maxH}
        //
        border={colorMode === "light" ? "1px solid" : "none"}
        borderColor="light.g_orange"
        bgColor={colorMode === "light" ? "white" : "grey.900"}
      >
        {options.map((option, i) => (
          <Fragment key={i}>
            <MenuItem
              //
              key={i}
              w="100%"
              h={option.image ? "48px" : "32px"}
              p="8px"
              textAlign="left"
              borderRadius="6px"
              isFocusable={false}
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
              {option.image && (
                <Center mr="16px">
                  <Image src={option.image} width="64px" height="32px" alt="" />
                </Center>
              )}
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
            {option.divider && (
              <Box p="8px 0px" w="100%" h="17px">
                <Box w="100%" h="1px" bgColor={colorMode === "light" ? "grey.100" : "dark.grey700"} />
              </Box>
            )}
          </Fragment>
        ))}
      </ChakraMenuList>
    </>
  );
};

export default MenuList;
