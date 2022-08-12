import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import { utils } from "ethers";
import { chain, useAccount } from "wagmi";
import { Link, Text, useBoolean, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { HOWTOPLAY_URL } from "~/constants";
import { goerliProvider } from "~/connectors";
import { Status } from "~/types/tx";
import { createPhiSubdomain } from "~/utils/ens";
import { setPhiSubdomain } from "~/hooks/ens/subdomain";
import { Modal, ModalHeader } from "./common/Modal";
import Button from "./common/Button";

const ENSNotFound: FC<{ refetch: () => void }> = ({ refetch }) => {
  const { colorMode, addTx } = useContext(AppContext);
  const { address } = useAccount();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [status, setStatus] = useState<Status>("idle");
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();

  useEffect(() => {
    addTx({
      hash,
      tmpStatus: "success",
      status,
      action: "Get ENS quickly",
      msg: "Assigning a subdomain to you...",
      chain: chain.goerli,
    });

    if (status === "success") {
      setTimeout(() => {
        refetch();
        stopLoading();
      }, 1000 * 5);
    } else if (status === "error") {
      stopLoading();
    }
  }, [status]);

  return (
    <Modal w="456px" h="520px" isOpen clickThrough onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <VStack mt="24px" spacing="24px">
        <Image src="/icons/ens.png" width="128px" height="128px" quality={100} />
        <VStack spacing="8px">
          <Text textStyle="headline-1" color={colorMode === "light" ? "grey.900" : "white"}>
            ENS not found
          </Text>
          <Text color="grey.500" textStyle="paragraph-1">
            Get your ENS to get your land.
          </Text>
        </VStack>
        <VStack
          p="24px"
          spacing="24px"
          w="408px"
          h="176px"
          borderRadius="12px"
          align="flex-start"
          bgColor={colorMode === "light" ? "white" : "dark.grey800"}
        >
          <VStack spacing="8px" align="flex-start">
            <Text textStyle="paragraph-2" color="grey.500">
              If you want to choose your ENS name
            </Text>
            <Link color="primary.500" textStyle="button-2" _focusVisible={{ boxShadow: "none" }} href={HOWTOPLAY_URL} isExternal>
              How to get a new ENS on Goerli
            </Link>
          </VStack>
          <VStack spacing="8px" align="flex-start">
            <Text textStyle="paragraph-2" color="grey.500">
              If you want to get ENS quickly
            </Text>
            <Button
              w="154px"
              h="32px"
              p="0"
              color="purple"
              borderRadius="8px"
              isLoading={isLoading}
              onClick={() => {
                if (!address) return;
                startLoading();
                const unix = new Date().getTime();
                createPhiSubdomain(address, unix)
                  .then((res) => {
                    const txHash = res.data.hash as `0x${string}`;

                    goerliProvider?.getTransaction(txHash).then(async (tx) => {
                      const inputs = utils.defaultAbiCoder.decode(
                        ["bytes32", "bytes32", "address", "address", "uint64"],
                        utils.hexDataSlice(tx.data, 4)
                      );
                      const labelhash = inputs[1];
                      setPhiSubdomain(labelhash, unix.toString() + ".phidemo.eth");

                      setHash(txHash);
                      setStatus("loading");
                      const receipt = await tx.wait();
                      if (receipt.status === 0) setStatus("error");
                      if (receipt.status === 1) setStatus("success");
                    });
                  })
                  .catch(stopLoading);
              }}
            >
              <Text textStyle="button-2" color={colorMode === "light" ? "white" : "grey.900"}>
                Get ENS quickly
              </Text>
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default ENSNotFound;
