import { Box } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { FC } from "react";
import Search from "./Search";

const Header: FC = () => {
  return (
    <>
      <Box
        position="fixed"
        top="16px"
        left="24px"
        cursor="pointer"
        onClick={() => {
          window.location.href = "/explorer"; // todo: redirect to LP
        }}
      >
        <Image src="/logo.png" width="64px" height="64px" />
      </Box>
      <Box position="fixed" top="24px" left="calc(24px + 64px + 24px)">
        <Search />
      </Box>
      <Box position="fixed" top="24px" right="24px">
        <ConnectButton />
      </Box>
    </>
  );
};

export default Header;
