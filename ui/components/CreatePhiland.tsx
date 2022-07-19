import { Box, Text, useBoolean, VStack } from "@chakra-ui/react";
import { TransactionResponse } from "@ethersproject/providers";
import Image from "next/image";
import { FC } from "react";
import { nullAddress } from "~/types";
import Button from "./Button";
import { Modal, ModalHeader } from "./Modal";
import SelectBox from "./SelectBox";

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
    <Modal w="456px" h="438px" isOpen overlay onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <VStack spacing="8px">
        <Image src="/icons/ens.svg" width="134px" height="150px" />
        <Box h="16px" />
        <SelectBox
          w="360px"
          options={domains.map((domain) => ({ label: domain, value: domain }))}
          selected={{ label: currentENS, value: currentENS }}
          handleChange={switchCurrentENS}
          disabled={isLoading}
        />
        <Button
          w="360px"
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
    </Modal>
  );
};

export default CreatePhiland;
