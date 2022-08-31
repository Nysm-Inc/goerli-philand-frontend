import dynamic from "next/dynamic";
import { FC } from "react";
import { useAccount, useNetwork } from "wagmi";
import Header from "~/ui/components/Header";
import Help from "~/ui/components/Help";
import WrongNetwork from "~/ui/components/WrongNetwork";
import LetsConnect from "~/ui/components/LetsConnect";

const Authed = dynamic(() => import("./Authed"));

const Main: FC = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  return (
    <>
      <Header />
      <Help />

      {address ? <>{chain?.unsupported ? <WrongNetwork /> : <Authed address={address} />}</> : <LetsConnect />}
    </>
  );
};

export default Main;
