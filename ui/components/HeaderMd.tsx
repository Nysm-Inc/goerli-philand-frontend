import { useRouter } from "next/router";
import Image from "next/image";
import { FC, useContext } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Search from "./Search";
import Icon from "./Icon";
import IconButton from "./common/IconButton";

const HeaderMd: FC = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useContext(AppContext);

  return (
    <>
      <Flex
        zIndex="search-menulist"
        position="fixed"
        left="12px"
        top="13px"
        p="8px 8px 8px 12px"
        gap="8px"
        w="calc(100vw - 12px * 2)"
        h="64px"
        boxShadow="base"
        borderRadius="16px"
        align="center"
        border={colorMode === "light" ? "1px solid" : "none"}
        bgColor={colorMode === "light" ? "white" : "grey.900"}
        borderColor={colorMode === "light" ? "light.g_orange" : "none"}
      >
        <Center
          position="relative"
          w="40px"
          minW="40px"
          h="40px"
          minH="40px"
          cursor="pointer"
          onClick={() => router.push("/", undefined, { shallow: true })}
        >
          <Image src="/icons/logo.svg" layout="fill" objectFit="contain" alt="" />
        </Center>
        <Search w="calc(100vw - 12px * 2 - 8px - 12px - 40px - 8px)" shadow={false} />
      </Flex>

      <Box zIndex="default" position="fixed" top="89px" right="19px">
        <IconButton
          ariaLabel="color_mode"
          size="40px"
          icon={
            <Center h="100%" w="100%">
              {colorMode === "light" ? (
                <Center h="28px" w="28px" bgColor="grey.900" borderRadius="6px">
                  <Icon name="moon" color="white" />
                </Center>
              ) : (
                <Center w="28px" h="28px" bgColor="white" borderRadius="6px">
                  <Icon name="sun" />
                </Center>
              )}
            </Center>
          }
          onClick={toggleColorMode}
        />
      </Box>
    </>
  );
};

export default HeaderMd;
