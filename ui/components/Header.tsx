import Image from "next/image";
import { FC, useContext, useRef } from "react";
import { Box, Center } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Search from "./Search";
import Wallet from "./Wallet";
import IconButton from "./IconButton";
import Icon from "./Icon";

const Header: FC = () => {
  const { colorMode, toggleColorMode } = useContext(AppContext);
  const ref = useRef(null);

  return (
    <>
      <Box
        position="fixed"
        top="8px"
        left="24px"
        cursor="pointer"
        onClick={() => {
          window.location.href = "/explorer"; // todo: redirect to LP
        }}
      >
        <Image src="/icons/logo.svg" width="72px" height="80px" />
      </Box>

      <Box position="fixed" top="24px" left="106px">
        <Search />
      </Box>

      {/* @ts-ignore */}
      <Box position="fixed" top="24px" right={`calc(${ref?.current?.offsetWidth || 0}px + 24px + 8px)`}>
        <IconButton
          ariaLabel="color_mode"
          icon={
            <Center h="100%" w="100%">
              {colorMode === "light" ? (
                <Center h="32px" w="32px" bgColor="#1A1A1A" borderRadius="8px">
                  <Icon name="moon" color="#FFFFFF" />
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
