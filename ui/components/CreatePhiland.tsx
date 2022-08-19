import Image from "next/image";
import { FC, useContext, useMemo } from "react";
import { useBalance } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { Link, Text, useBoolean, VStack } from "@chakra-ui/react";
import { HOWTOPLAY_URL } from "~/constants";
import { AppContext } from "~/contexts";
import { nullAddress } from "~/types";
import { event } from "~/utils/ga/ga";
import { textShadows } from "~/ui/styles/typography";
import { colors } from "~/ui/styles/color";
import { Modal, ModalHeader } from "./common/Modal";
import Button from "./common/Button";
import SelectBox from "./common/SelectBox";
import Message from "./Message";

const CreatePhiland: FC<{
  address: string;
  owner: string;
  currentENS: string;
  domains: string[];
  switchCurrentENS: (ens: string) => void;
  createPhiland: () => Promise<TransactionResponse | undefined>;
  changePhilandOwner: () => Promise<TransactionResponse | undefined>;
}> = ({ address, owner, currentENS, domains, switchCurrentENS, createPhiland, changePhilandOwner }) => {
  const { colorMode } = useContext(AppContext);
  const { data } = useBalance({ addressOrName: address, watch: true });
  const insufficient = useMemo(() => !!data?.value.isZero(), [data]);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();

  return (
    <Modal w="456px" h={insufficient ? "498px" : "422px"} isOpen overlay onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <VStack spacing="14px">
        <VStack mt="14px" spacing="24px">
          <Image src="/icons/ens.png" width="128px" height="128px" quality={100} alt="" />
          <Text w="356px" h="48px" textAlign="center" textStyle="paragraph-1" color="grey.500">
            You can choose your ENS to create your new land.
          </Text>
          <VStack spacing="8px">
            <SelectBox
              w="408px"
              options={domains.map((domain) => ({ label: domain, value: domain }))}
              selected={{ label: currentENS, value: currentENS }}
              handleChange={switchCurrentENS}
              disabled={isLoading}
              placeholder="Select your ENS"
            />
            <Button
              w="408px"
              color="purple"
              onClick={() => {
                startLoading();
                (owner === nullAddress ? createPhiland : changePhilandOwner)()
                  .then(async (res) => {
                    if (owner === nullAddress) event({ action: "conversion_create_philand" });
                    await res?.wait();
                    stopLoading();
                  })
                  .catch(stopLoading);
              }}
              isLoading={isLoading}
              disabled={insufficient || !currentENS}
            >
              <Text
                color={insufficient ? "grey.500" : "white"}
                textStyle="button-1"
                {...(insufficient && {
                  textShadow: textShadows["button-1-disabled"],
                  style: { WebkitTextStroke: colorMode === "light" ? `1px ${colors.grey[200]}` : `1px ${colors.dark.grey800}` },
                })}
              >
                {owner === nullAddress ? "CREATE LAND" : "CHANGE OWNER"}
              </Text>
            </Button>
          </VStack>
        </VStack>
        {insufficient && (
          <>
            <Message color="danger" text="Your Wallet’s $MATIC balance is insufficient." />
            <Link
              color="primary.500"
              textStyle="button-2"
              _focusVisible={{ boxShadow: "none" }}
              href={HOWTOPLAY_URL + "#17bd0eb79e804ad493081e31cfe58e05"}
              isExternal
            >
              How to claim $MATIC
            </Link>
          </>
        )}
      </VStack>
    </Modal>
  );
};

export default CreatePhiland;
