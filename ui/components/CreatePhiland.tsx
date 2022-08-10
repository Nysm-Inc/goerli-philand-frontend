import { Text, useBoolean, VStack } from "@chakra-ui/react";
import type { TransactionResponse } from "@ethersproject/providers";
import Image from "next/image";
import { FC } from "react";
import { nullAddress } from "~/types";
import { Modal, ModalHeader } from "./common/Modal";
import Button from "./common/Button";
import SelectBox from "./common/SelectBox";

const CreatePhiland: FC<{
  owner: string;
  currentENS: string;
  domains: string[];
  isCreatedPhiland: boolean;
  switchCurrentENS: (ens: string) => void;
  createPhiland: () => Promise<TransactionResponse | undefined>;
  changePhilandOwner: () => Promise<TransactionResponse | undefined>;
}> = ({ owner, currentENS, domains, isCreatedPhiland, switchCurrentENS, createPhiland, changePhilandOwner }) => {
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();

  return (
    <Modal w="456px" h="398px" isOpen overlay onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <VStack mt="14px" spacing="24px">
        <Image src="/icons/ens.svg" width="128px" height="128px" priority />
        <Text textAlign="center" textStyle="paragraph-1" color="grey.500">
          Choose your ENS
        </Text>
        <VStack spacing="8px">
          <SelectBox
            w="408px"
            options={domains.map((domain) => ({ label: domain, value: domain }))}
            selected={{ label: currentENS, value: currentENS }}
            handleChange={switchCurrentENS}
            disabled={isLoading}
          />
          <Button
            w="408px"
            color="purple"
            onClick={() => {
              startLoading();
              (owner === nullAddress ? createPhiland : changePhilandOwner)()
                .then(async (res) => {
                  await res?.wait();
                  stopLoading();
                })
                .catch(stopLoading);
            }}
            isLoading={isLoading}
            disabled={isCreatedPhiland}
          >
            <Text color="white" textStyle="button-1">
              {owner === nullAddress ? "CREATE LAND" : "CHANGE OWNER"}
            </Text>
          </Button>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default CreatePhiland;
