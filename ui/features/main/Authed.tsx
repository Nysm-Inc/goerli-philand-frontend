import dynamic from "next/dynamic";
import { FC } from "react";
import { useEnsName, useNetwork } from "wagmi";
import { Box } from "@chakra-ui/react";
import useENS from "~/hooks/ens";

const ENSNotFound = dynamic(() => import("~/ui/components/ENSNotFound"));
const HasENS = dynamic(() => import("./HasENS"));

const Authed: FC<{ address: string }> = ({ address }) => {
  const { chain } = useNetwork();
  const { data: dataENS } = useEnsName({ address });
  const ens = !chain?.unsupported ? dataENS : "";
  const [{ isLoading, domains }, currentENS, switchCurrentENS] = useENS(address, ens, chain?.unsupported);

  return (
    <>
      {domains.length > 0 ? (
        <HasENS address={address} currentENS={currentENS} domains={domains} switchCurrentENS={switchCurrentENS} />
      ) : (
        <Box zIndex="default" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
          {isLoading ? <></> : <ENSNotFound />}
        </Box>
      )}
    </>
  );
};

export default Authed;
