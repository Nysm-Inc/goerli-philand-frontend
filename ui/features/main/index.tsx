import dynamic from "next/dynamic";
import Image from "next/image";
import { FC } from "react";
import { useAccount, useEnsName, useNetwork } from "wagmi";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Header, ENSNotFound, Help, CreatePhiland, HowItWorks } from "~/ui/components";
import { useChangePhilandOwner, useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useViewPhiland } from "~/hooks/map";

const ConfirmModal = dynamic(() => import("~/ui/components/transaction/ConfirmModal"));
const StatusToast = dynamic(() => import("~/ui/components/transaction/StatusToast"));
const Philand = dynamic(() => import("./Philand"));

const Main: FC = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: dataENS } = useEnsName({ address });
  const ens = !chain?.unsupported ? dataENS : "";

  const { isOpen: isOpenHowItWorks, onOpen: onOpenHowItWorks, onClose: onCloseHowItWorks } = useDisclosure();
  const [{ isLoading, domains }, currentENS, switchCurrentENS] = useENS(address, ens, chain?.unsupported);
  const [{ isCreated }, { createPhiland }] = useCreatePhiland(address, currentENS);
  const { changePhilandOwner } = useChangePhilandOwner(address, currentENS);
  const { owner, phiObjects } = useViewPhiland(currentENS);
  const isCreatedPhiland = owner === address && (isCreated || phiObjects.length > 0);

  return (
    <>
      <Header />
      <Help onOpenHowItWorks={onOpenHowItWorks} />
      <HowItWorks isCreatedPhiland={isCreatedPhiland} isOpen={isOpenHowItWorks} onOpen={onOpenHowItWorks} onClose={onCloseHowItWorks} />

      {currentENS && (
        <>
          <ConfirmModal />
          <StatusToast />
        </>
      )}

      {isCreatedPhiland ? (
        <Philand
          //
          address={address}
          currentENS={currentENS}
          domains={domains}
          switchCurrentENS={switchCurrentENS}
          phiObjects={phiObjects}
        />
      ) : (
        <>
          {domains.length > 0 ? (
            <CreatePhiland
              owner={owner}
              currentENS={currentENS}
              domains={domains}
              isCreatedPhiland={isCreatedPhiland}
              switchCurrentENS={switchCurrentENS}
              createPhiland={createPhiland}
              changePhilandOwner={changePhilandOwner}
            />
          ) : (
            <>
              {address ? (
                <>
                  {isLoading ? (
                    <></>
                  ) : (
                    <Box zIndex="default" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                      <ENSNotFound />
                    </Box>
                  )}
                </>
              ) : (
                <Box zIndex="default" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                  <Image src="/icons/ENShold.png" width="96px" height="96px" />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Main;
