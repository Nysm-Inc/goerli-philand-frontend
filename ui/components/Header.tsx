import { useRouter } from "next/router";
import Image from "next/image";
import { FC, useContext } from "react";
import { Box, Center, HStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import IconButton from "./common/IconButton";
import Search from "./Search";
import Icon from "./Icon";
import Wallet from "./Wallet";

const Header: FC = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useContext(AppContext);

  return (
    <>
      <Box
        zIndex="default"
        position="fixed"
        top="16px"
        left="24px"
        cursor="pointer"
        onClick={() => router.push("/", undefined, { shallow: true })}
      >
        <Image src="/icons/logo.svg" width="64px" height="64px" alt="" />
      </Box>

      <Box zIndex="default" position="fixed" top="24px" left="106px">
        <Search />
      </Box>

      <HStack zIndex="default" position="fixed" top="24px" right="24px" spacing="8px">
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
        <Wallet />
      </HStack>
    </>
  );
};

export default Header;
