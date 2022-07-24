import Image from "next/image";
import { FC, useContext, useRef } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Search from "./Search";
import Wallet from "./Wallet";
import IconButton from "./IconButton";
import Icon from "./Icon";
import Button from "./Button";

const Header: FC = () => {
  const { colorMode, toggleColorMode } = useContext(AppContext);
  const ref = useRef(null);

  return (
    <>
      <Box position="fixed" top="16px" left="24px" cursor="pointer" onClick={() => (window.location.href = "/")}>
        <Image src="/icons/logo.svg" width="64px" height="64px" />
      </Box>

      <Box position="fixed" top="24px" left="106px">
        <Search />
      </Box>

      <Box position="fixed" top="24px" left="calc(106px + 336px + 16px)">
        <Button w="146px" disabled leftIcon={<Image src="/icons/leaderboard.svg" width="24px" height="24px" />}>
          <Text textStyle="button-2" color={colorMode === "light" ? "grey.900" : "white"}>
            Leaderboard
          </Text>
        </Button>
      </Box>

      {/* @ts-ignore */}
      <Box position="fixed" top="24px" right={`calc(${ref?.current?.offsetWidth || 0}px + 24px + 8px)`}>
        <IconButton
          ariaLabel="color_mode"
          icon={
            <Center h="100%" w="100%">
              {colorMode === "light" ? (
                <Center h="32px" w="32px" bgColor="grey.900" borderRadius="8px">
                  <Icon name="moon" color="white" />
                </Center>
              ) : (
                <Center w="32px" h="32px" bgColor="white" borderRadius="8px">
                  <Icon name="sun" />
                </Center>
              )}
            </Center>
          }
          onClick={toggleColorMode}
        />
      </Box>

      <Box ref={ref} position="fixed" top="24px" right="24px">
        <Wallet />
      </Box>
    </>
  );
};

export default Header;
