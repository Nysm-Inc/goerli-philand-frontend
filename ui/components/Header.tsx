import Image from "next/image";
import { FC, useContext, useRef } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Search from "./Search";
import IconButton from "./IconButton";
import Icon from "./Icon";
import Button from "./Button";
import Wallet from "./Wallet";

const Header: FC = () => {
  const { colorMode, toggleColorMode } = useContext(AppContext);
  const ref = useRef(null);

  return (
    <>
      <Box zIndex="default" position="fixed" top="16px" left="24px" cursor="pointer" onClick={() => (window.location.href = "/")}>
        <Image src="/icons/logo.svg" width="64px" height="64px" />
      </Box>

      <Box zIndex="default" position="fixed" top="24px" left="106px">
        <Search />
      </Box>

      <Box zIndex="default" position="fixed" top="24px" left="calc(106px + 336px + 16px)">
        <Button
          w="146px"
          disabled
          shadow
          justify="space-between"
          leftIcon={<Image src="/icons/leaderboard.svg" width="24px" height="24px" />}
        >
          <Text textStyle="button-2" color={colorMode === "light" ? "dark.grey300" : "dark.grey600"}>
            Leaderboard
          </Text>
        </Button>
      </Box>

      {/* @ts-ignore */}
      <Box zIndex="default" position="fixed" top="24px" right={`calc(${ref?.current?.offsetWidth || 153}px + 24px + 8px)`}>
        <IconButton
          ariaLabel="color_mode"
          icon={
            <Center h="100%" w="100%">
              {colorMode === "light" ? (
                <Center h="32px" w="32px" bgColor="grey.900" borderRadius="6px">
                  <Icon name="moon" color="white" />
                </Center>
              ) : (
                <Center w="32px" h="32px" bgColor="white" borderRadius="6px">
                  <Icon name="sun" />
                </Center>
              )}
            </Center>
          }
          onClick={toggleColorMode}
        />
      </Box>

      <Box ref={ref} zIndex="default" position="fixed" top="24px" right="24px">
        <Wallet />
      </Box>
    </>
  );
};

export default Header;
