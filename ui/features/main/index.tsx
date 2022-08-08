import dynamic from "next/dynamic";
import Image from "next/image";
import { FC } from "react";
import { useAccount } from "wagmi";
import { Box } from "@chakra-ui/react";
import Header from "~/ui/components/Header";
import Help from "~/ui/components/Help";

const Authed = dynamic(() => import("./Authed"));

const Main: FC = () => {
  const { address } = useAccount();

  return (
    <>
      <Header />
      <Help />

      {address ? (
        <Authed address={address} />
      ) : (
        <Box zIndex="default" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Image src="/icons/ENShold.png" width="96px" height="96px" />
        </Box>
      )}
    </>
  );
};

export default Main;
