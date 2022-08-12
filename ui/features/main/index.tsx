import dynamic from "next/dynamic";
import Image from "next/image";
import { FC } from "react";
import { useAccount, useNetwork } from "wagmi";
import { Box } from "@chakra-ui/react";
import Header from "~/ui/components/Header";
import Help from "~/ui/components/Help";
import WrongNetwork from "~/ui/components/WrongNetwork";

const Authed = dynamic(() => import("./Authed"));

const Main: FC = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  return (
    <>
      <Header />
      <Help />

      {address ? (
        <>{chain?.unsupported ? <WrongNetwork /> : <Authed address={address} />}</>
      ) : (
        <Box zIndex="default" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Image src="/icons/ENShold.png" width="96px" height="96px" priority quality={100} />
        </Box>
      )}
    </>
  );
};

export default Main;
